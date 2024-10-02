const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Verifica se o token está no header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Captura o token após "Bearer"
      token = req.headers.authorization.split(' ')[1];

      // Decodifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário pelo ID do token
      req.user = await User.findById(decoded.userId).select('-password');

      // Verifica se o usuário existe
      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Permite seguir para a rota protegida
      next();
    } catch (error) {
      console.error('Erro ao verificar o token:', error.message);
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
});

module.exports = { protect };
