const errorHandler = (err, req, res, next) => {
  // Definir o status code se não estiver definido
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message, // Mensagem principal do erro
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Mostrar stack trace apenas em ambiente de desenvolvimento
  });
};

// Middleware para rotas não encontradas
const notFound = (req, res, next) => {
  const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};
