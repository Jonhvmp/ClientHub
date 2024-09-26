const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definição do esquema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Remove espaços em branco no início e no fim
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Converte o e-mail para minúsculas
    validate: {
      validator: function (v) {
        // Validação do formato do e-mail
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} não é um e-mail válido!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Mínimo de 6 caracteres para a senha
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'manager'], // Papéis permitidos
    default: 'user' // Valor padrão
  },
  createdAt: {
    type: Date,
    default: Date.now // Data de criação
  }
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10); // Geração do salt
  this.password = await bcrypt.hash(this.password, salt); // Hash da senha
  next();
});

// Método para comparar a senha
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Criação e exportação do modelo
const User = mongoose.model('User', userSchema);

module.exports = User;
