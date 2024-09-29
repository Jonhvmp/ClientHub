const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware de proteção (autenticação)
const protect = async (req, res, next) => {
  let token;

  // Verifica se o token está no cabeçalho
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token
      token = req.headers.authorization.split(' ')[1];
      // Verifica o token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Adiciona o usuário à requisição (excluindo a senha)
      req.user = await User.findById(decoded.id).select('-password');

      // Passa para o próximo middleware
      next();
    } catch (error) {
      console.error('Erro de autenticação:', error);
      res.status(401).json({ message: 'Token inválido, autorização negada' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado, token não fornecido' });
  }
};

module.exports = protect;
