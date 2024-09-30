const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Certifique-se que o segredo está correto
    verifyToken(req, res, next);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send('Invalid token.');
  }
};

console.log('Token verificado com sucesso:', token);

module.exports = verifyToken;
