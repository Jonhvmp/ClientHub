const express = require('express');
const cors = require('cors');  // Importe o CORS
const connectDB = require('./config/db'); // Importe a função de conexão com o MongoDB
const clientRoutes = require('./routes/clientRoutes'); // Importe as rotas de clientes
const Client = require('./models/clientModel'); // Importe o modelo de cliente

const app = express();

connectDB(); // Conectar ao MongoDB

// Habilitar CORS para todas as rotas
app.use(cors());
app.use(express.json());

// Usar as rotas de clientes
app.use('/api', clientRoutes); // Adicione '/api' como prefixo para todas as rotas de clientes

// Uma Rota GET para listar todos os clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const clients = await Client.find(); // Buscar todos os clientes do MongoDB
    res.json(clients); // Retornar os clientes como JSON
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Rota principal para verificação do funcionamento da API
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Definir a porta do servidor e iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
