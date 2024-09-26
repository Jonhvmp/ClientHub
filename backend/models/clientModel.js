const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10,14}/.test(v);
      },
      message: props => `${props.value} não é um número de telefone válido!`
    },
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  company: {
    type: String,
    trim: true,
  },
  subscriptionType: {
    type: String,
    enum: ['mensal', 'trimestral', 'semestral', 'anual'],
    default: 'mensal',
  },
  subscriptionStatus: {
    type: String,
    enum: ['ativo', 'inativo', 'pendente', 'cancelado'],
    default: 'ativo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
  notes: String,
  tags: [String],
});

// Middleware para atualizar o campo updatedAt antes de salvar
clientSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Método para verificar se a assinatura está ativa
clientSchema.methods.isSubscriptionActive = function() {
  return this.subscriptionStatus === 'ativo' && this.expiresAt > new Date();
};

// Índices para melhorar a performance das consultas
clientSchema.index({ email: 1 });
clientSchema.index({ phone: 1 });
clientSchema.index({ subscriptionStatus: 1 });
clientSchema.index({ expiresAt: 1 });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
