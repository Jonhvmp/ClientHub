const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // Certifique-se de que o modelo de usuário está corretamente importado

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Obtém o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token

      req.user = await User.findById(decoded.id).select('-password'); // Busca o usuário no banco de dados

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      next(); // Passa para o próximo middleware
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      return res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'Não autorizado, sem token' });
  }
});

module.exports = { protect };
