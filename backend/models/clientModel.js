const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Garantir que o e-mail seja único
  },
  phone: {
    type: String,
    required: true,
  },
  subscriptionType: {
    type: String,
    enum: ['mensal', 'trimestral','semestral','anual'],
    default: 'mensal',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
