// authController.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// Funções para gerar tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '60d' });
};

// Registro de usuário
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email já está em uso' });
  }

  const user = new User({ name, email, password });
  await user.save();

  // Gerar tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Armazenar o refresh token no cookie (HTTP-only)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
  });

  res.status(201).json({ message: 'Usuário registrado com sucesso!', accessToken });
});

// Login de usuário
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Gerar tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Armazenar o refresh token no cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.json({
      success: true,
      accessToken,
    });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Renovar o token de acesso
exports.refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token não fornecido' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(decoded.userId);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Refresh token inválido ou expirado' });
  }
});
