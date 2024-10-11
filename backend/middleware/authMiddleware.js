const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtém o token do cabeçalho
      token = req.headers.authorization.split(' ')[1];
      // Decodifica o token usando o segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verifica o tempo de expiração do token
      const currentTime = Math.floor(Date.now() / 1000);
      const timeToExpire = decoded.exp - currentTime;

      if (timeToExpire <= 0) {
        console.log('Token expirado');
        return res.status(401).json({ message: 'Token expirado' });
      } else {
        console.log(`Token expira em: ${new Date(decoded.exp * 1000).toISOString()}`);
      }

      // Encontra o usuário com base no userId do token decodificado
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      next();
    } catch (error) {
      console.error('Erro ao validar o token:', error);
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
});

module.exports = { protect };
