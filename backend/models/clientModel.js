const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  // Informações básicas do cliente
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} não é um e-mail válido!`
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10,14}/.test(v);
      },
      message: props => `${props.value} não é um número de telefone válido!`
    },
  },

  // Endereço e detalhes adicionais
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  // Informações sobre a empresa (caso seja um cliente corporativo)
  company: {
    type: String,
    trim: true,
  },

  // Customização de campos dinâmicos por usuário
  customFields: [{
    fieldName: String,
    fieldValue: String,
    fieldType: String,
  }],

  // Histórico de atividades/interações com o cliente
  activityHistory: [{
    date: {
      type: Date,
      default: Date.now,
    },
    action: String,
    notes: String,
  }],

  // Tags para categorização do cliente
  tags: [String],

  // Tipos de serviços específicos prestados ao cliente
  services: [{
    serviceType: String,
    serviceDetails: String,
    startDate: Date,
    endDate: Date,
  }],

  // Status da relação com o cliente
  status: {
    type: String,
    enum: ['ativo', 'inativo', 'pendente', 'cancelado'],
    default: 'ativo',
  },

  // Informações de assinatura
  subscriptionType: {
    type: String,
    enum: ['mensal', 'trimestral', 'semestral', 'anual'],
    default: 'mensal',
  },
  subscriptionDuration: {
    type: Number, // Duração da assinatura em meses (ex: 1, 3, 6, 12)
    default: 1,   // Valor padrão para assinatura mensal
  },
  subscriptionStartDate: {
    type: Date,
    default: Date.now,
  },

  // Upload de arquivos/documentos associados ao cliente
  documents: [{
    documentName: String,
    documentUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    history: [{
      action: String,
      date: {
        type: Date,
        default: Date.now,
      },
    }],
  }],

  // Associado ao usuário
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Datas de criação e atualização
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para atualizar o campo updatedAt antes de salvar
clientSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Índice único para email e userId
clientSchema.index({ email: 1, userId: 1 }, { unique: true });

// Criação e exportação do modelo
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
