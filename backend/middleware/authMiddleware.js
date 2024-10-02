const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verifica o tempo de expiração do token
      const currentTime = Math.floor(Date.now() / 1000);
      const timeToExpire = decoded.exp - currentTime;

      if (timeToExpire <= 0) {
        console.log('Token expirado');
      } else {
        console.log(`Tempo restante para expirar o Token: ${timeToExpire} segundos`);
      }

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
});

module.exports = { protect };
