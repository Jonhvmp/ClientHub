const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // Certifique-se de que o caminho está correto

// Middleware para proteger rotas, verificando o token JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token JWT

      req.user = await User.findById(decoded.id).select('-password'); // Busca o usuário no banco de dados

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      console.log('Token verificado com sucesso:', token);
      next(); // Passa para o próximo middleware
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      return res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'Não autorizado, sem token' });
  }
});

// Middleware para autorizar usuários com base no papel (role)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado: você não tem permissão' });
    }
    next(); // Passa para o próximo middleware
  };
};

module.exports = { protect, authorize };
