const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro
router.post('/register', [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Erros de validação no registro:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Tentativa de registro com email já existente: ${email}`);
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Senha criptografada para ${email}:`, hashedPassword);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(`Usuário registrado com sucesso: ${email}`);
    res.status(201).json({ message: 'Usuário registrado com sucesso!', token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Recebendo dados:', { email, password });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Usuário não encontrado para o email: ${email}`);
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    console.log('Senha armazenada no banco:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Senha incorreta para o email: ${email}`);
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
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Tentativa de redefinir senha para email não encontrado: ${email}`);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Lógica para envio de email de redefinição de senha (a ser implementada)
    console.log(`Email de redefinição de senha enviado para: ${email}`);
    res.status(200).json({ message: 'Email de redefinição enviado' });
  } catch (error) {
    console.error('Erro ao enviar email de redefinição de senha:', error);
    res.status(500).json({ message: 'Erro ao enviar email', error });
  }
});

// Redefinir senha
router.post('/reset-password', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  body('token').notEmpty().withMessage('Token é obrigatório')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Erros de validação na redefinição de senha:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });

    if (!user || decoded.userId !== user._id.toString()) {
      console.log('Token inválido ou usuário não encontrado para email:', email);
      return res.status(401).json({ message: 'Token inválido ou usuário não encontrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    console.log(`Senha redefinida com sucesso para ${email}`);
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro ao redefinir a senha', error });
  }
});

module.exports = router;
