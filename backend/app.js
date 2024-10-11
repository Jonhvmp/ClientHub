// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const userRoutes = require('./routes/userRouter');
const { errorHandler } = require('./middleware/errorHandler');

require('dotenv').config();

// Inicializando o app
const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rotas de autenticação e clientes
app.use('/api/auth', authRoutes);
app.use('/api', clientRoutes);
app.use('/api/user', userRoutes);

// Servir a pasta uploads como um diretório estático
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

module.exports = app;
