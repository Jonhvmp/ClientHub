const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

// Rate limiter for forgot-password route
const forgotPasswordLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Função para validar entradas com base na rota
const validate = (method) => {
  switch (method) {
    case 'register':
      return [
        body('name').notEmpty().withMessage('Nome é obrigatório'),
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
      ];
    case 'login':
      return [
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
      ];
    case 'forgot-password':
      return [
        body('email').isEmail().withMessage('Email inválido')
      ];
    case 'reset-password':
      return [
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
        body('token').notEmpty().withMessage('Token é obrigatório')
      ];
  }
};

router.post('/login', validate('login'), loginUser);

// Rota de registro de usuário
router.post('/register', validate('register'), registerUser);

// Dashboard de rota protegida
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Bem-vindo ao dashboard!', user: req.user });
});

// Teste para verificação da API de autenticação
router.get('/', protect, (req, res) => {
  res.json({ message: 'API de autenticação funcionando!' });
});

// Esqueceu a senha
router.post('/forgot-password', forgotPasswordLimiter, validate('forgot-password'), async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Lógica para envio de email de redefinição de senha (a ser implementada)
    res.status(200).json({ message: 'Email de redefinição enviado' });
  } catch (error) {
    console.error('Erro ao enviar email de redefinição de senha:', error);
    res.status(500).json({ message: 'Erro ao enviar email' });
  }
});

// Redefinir senha
router.post('/reset-password', validate('reset-password'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });

    if (!user || decoded.userId !== user._id.toString()) {
      return res.status(401).json({ message: 'Token inválido ou usuário não encontrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro ao redefinir a senha' });
  }
});

module.exports = router;
