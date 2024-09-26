const express = require('express');
const { body } = require('express-validator');
const User = require('../models/userModel');
const generateToken = require('../config/jwt');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Registro
router.post('/register', async (req, res) => {
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

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

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
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login Admin
router.post('/login-admin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Busca o usuário pelo e-mail
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    } else if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    } // Verifica se o usuário é um administrador

    const isMatch = await bcrypt.compare(password, user.password); // Compara as senhas
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    } // Verifica se a senha está correta

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token }); // Retorna o token

  } catch (error) { // Tratamento de erros
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Esqueceu a senha (simples)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    // Lógica para enviar email de redefinição de senha
    res.status(200).json({ message: 'Email de redefinição enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar email', error });
  }
});

// Redefinir senha
router.post('/reset-password', async (req, res) => {
  const { email, password, token } = req.body;
  try {
    const user = await User.findOne ({ email });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId !== user._id) {
      return res.status(401).json({ message: 'Token inválido' });
      // Verifica se o token é válido
    }
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    // Lógica para redefinir a senha
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir a senha', error });
  }
});

module.exports = router;
