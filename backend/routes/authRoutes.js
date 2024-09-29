const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

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

// Teste para verificação da API de autenticação
router.get('/', (req, res) => {
  res.json({ message: 'API de autenticação funcionando!' });
});

// Registro de usuário
router.post('/register', validate('register'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Corrigindo para hash da senha

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Usuário registrado com sucesso!', token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Login de usuário
router.post('/login', validate('login'), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Esqueceu a senha
router.post('/forgot-password', validate('forgot-password'), async (req, res) => {
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
