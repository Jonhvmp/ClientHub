// authController.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Registro de usuário
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Verificar se todos os campos estão presentes
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  // Verificar se o email é válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  // Verificar se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  // Verificar se as senhas coincidem
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email já está em uso' });
  }

  // Criar novo usuário (a senha será criptografada no modelo)
  const user = new User({ name, email, password });
  await user.save();

  // Gerar token de autenticação
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // console.log(token + "token")
  // console.log(user)

  res.status(201).json({ message: 'Usuário registrado com sucesso!', token });
});

// Login de usuário
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      success: true,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Credenciais inválidas');
  }
});
