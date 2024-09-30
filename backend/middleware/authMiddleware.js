const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Para lidar com async errors
const User = require('../models/User'); // Se você está buscando o usuário no banco de dados

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Verifica se o token está presente nos headers da requisição
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token da requisição
      token = req.headers.authorization.split(' ')[1];

      // Verifica e decodifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Atribui o usuário decodificado à requisição (se você buscar o usuário pelo ID)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token inválido ou não autorizado' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Token não encontrado. Autorização negada.' });
  }
});
