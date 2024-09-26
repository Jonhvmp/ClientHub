require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Fake login
const fakeLogin = require('./routes/fakeLogin');
app.use('/api', fakeLogin);
console.log(`Rota fake-login: http://localhost:${process.env.PORT || 5000}/api/fake-login`);


// Conectar ao MongoDB
connectDB();

// Middleware
app.use(helmet()); // Adiciona cabeçalhos de segurança
app.use(morgan('dev')); // Logging
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes', clientRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware de tratamento de erros
app.use(errorHandler);

// Definir a porta do servidor e iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

module.exports = app; // Para testes
