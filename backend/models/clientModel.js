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

  // Múltiplos contatos associados
  contacts: [{
    name: String,
    email: String,
    phone: String,
    role: String, // Ex: gerente, assistente, etc.
  }],

  // Informações sobre a empresa (caso seja um cliente corporativo)
  company: {
    type: String,
    trim: true,
  },

  // Customização de campos dinâmicos por usuário
  customFields: [{
    fieldName: String, // Nome do campo
    fieldValue: String, // Valor do campo
    fieldType: String,  // Ex: texto, número, data
  }],

  // Histórico de atividades/interações com o cliente
  activityHistory: [{
    date: {
      type: Date,
      default: Date.now,
    },
    action: String, // Ex: "Envio de proposta", "Reunião agendada"
    notes: String,  // Observações da atividade
  }],

  // Tags para categorização do cliente
  tags: [String],

  // Tipos de serviços específicos prestados ao cliente
  services: [{
    serviceType: String,  // Ex: "Consultoria", "Manutenção"
    serviceDetails: String, // Detalhes do serviço prestado
    startDate: Date,  // Data de início do serviço
    endDate: Date,    // Data de término do serviço (se aplicável)
  }],

  // Status da relação com o cliente
  status: {
    type: String,
    enum: ['ativo', 'inativo', 'pendente', 'cancelado'],
    default: 'ativo',
  },

  // Upload de arquivos/documentos associados ao cliente
  documents: [{
    documentName: String,
    documentUrl: String, // URL do documento no sistema
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
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
