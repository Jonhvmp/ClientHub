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

// Importando o módulo JWT
const jwt = require('jsonwebtoken');

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
  // Validações de entrada
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
], async (req, res) => {
  console.log('Recebendo dados:', req.body); // Exibe o corpo completo da requisição

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Criar um novo usuário com a senha criptografada
    const user = new User({
      name,
      email,
      password,
    });

    // Salvar o usuário no banco de dados
    await user.save();

    // Recebendo dados: {
    //   name: 'Jonh',
    //   email: 'Jonh1@gmail.com',
    //   password: 'senha123',
    //   confirmPassword: 'senha123'
    // }
    // Senha original: senha123
    // Senha criptografada: $2a$10$ASjljkQGauuAXQI8HryRluQAkj2ciImDYrWXjr1tz7S5R0.QDOTyW
    //                      $2a$10$mWln3Hk5SZxHYThBCGIqe.jcI1poRwtmg.qAsooqBk63YsQpQMvEC

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota de login
app.post('/api/login', [
  // Validações de entrada
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
], async (req, res) => {
  console.log('Recebendo dados:', req.body); // Exibe o corpo completo da requisição
  const { email, password } = req.body;

  // Valida os erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Procurar o usuário no banco de dados
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('Usuário encontrado:', user);
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Comparação de senha:', isMatch);
    if (!isMatch) {
      console.log('Senha incorreta para o email:', email);
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Geração de token JWT
    const token = jwt.sign({
      userId: user._id
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });

    console.log('Login bem-sucedido:', email);

    // Retorna o token para o cliente
    res.status(200).json({ token, message: 'Login bem-sucedido' });

  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Middleware para rotas não encontradas e tratamento de erros
app.use(notFound);
app.use(errorHandler);

// verificando erros de validação do bcrypt.compare() e bcrypt.hash()
// const run = async () => {
//   const email = 'jonhpaz08@gmail.com';
//   const password = '12345678';
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log('Senha criptografada:', hashedPassword);
//   const isMatch = await bcrypt.compare('12345678', hashedPassword);
//   console.log('Resultado da comparação:', isMatch);

//   const user = await User.findOne({ email });
//   if (user) {
//     console.log('Usuário encontrado com o email:', email);
//     const isMatch = await bcrypt.compare(password, user.password
//     ); // Verifica a senha
//     console.log('Resultado da comparação de senha:', isMatch);
//   } else {
//     console.log('Usuário não encontrado com o email:', email);
//   } // Se o usuário não existir, exibe uma mensagem
// };
// run();

// Adicione isso temporariamente no app.js, antes ou depois das rotas principais

// const testPassword = async () => {
//   const hash = '$2a$10$J2ODLDxgtoW5Y6HDeU5H1OK.mxM7xDLLtQeOBgxY3XrL03ZlDyVrK'; // Hash do MongoDB
//   const password = 'Senha123'; // Senha que você está testando

//   const isMatch = await bcrypt.compare(password, hash);
//   console.log('Resultado da comparação manual:', isMatch); // True ou False
// };

// testPassword();

// Definir a porta do servidor e iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

module.exports = app;
