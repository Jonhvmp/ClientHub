// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      next(); // Se tudo estiver correto, prossiga
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
});

module.exports = { protect };
