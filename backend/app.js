require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');

// Importando o módulo JWT
const jwt = require('jsonwebtoken');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes', clientRoutes);
app.use('/api/auth', authRoutes);

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
  req.status(200, 'API funcionando!');
});

// Definir a porta do servidor e iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

module.exports = app;
