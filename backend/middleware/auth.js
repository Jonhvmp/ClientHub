const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Middleware para proteger rotas, verificando o token JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
      console.log('Token verificado com sucesso' + token);
    } catch (error) {
      res.status(401);
      throw new Error('Não autorizado, token falhou');
    }
  } else {
    res.status(401);
    throw new Error('Não autorizado, sem token');
  }
});

// Middleware para autorizar usuários com base no papel (role)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Acesso negado: você não tem permissão');
    }
    next();
  };
};

module.exports = { protect, authorize };
