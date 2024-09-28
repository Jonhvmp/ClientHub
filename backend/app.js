require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const connectDB = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const User = require('./models/userModel');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes', clientRoutes);
app.use('/api/auth', authRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rota de registro
app.post('/api/register', [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota de login
app.post('/api/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Verifica se o usuário existe
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    } // Se o usuário não existir, retorna um erro

    const isMatch = await bcrypt.compare(password, user.password); // Verifica se a senha está correta

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    } // Se a senha estiver incorreta, retorna um erro

    res.json({ message: 'Login efetuado com sucesso!' });
  } catch (error) { // Se houver um erro no servidor
    res.status(500).json({ message: 'Erro ao efetuar login' });
  }
});

// Middleware para rotas não encontradas e tratamento de erros
app.use(notFound);
app.use(errorHandler);

// Definir a porta do servidor e iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

module.exports = app;
