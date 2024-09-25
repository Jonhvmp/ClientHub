const express = require('express');
const cors = require('cors');  // Importe o CORS
const connectDB = require('./config/db'); // Importe a função de conexão com o MongoDB
const clientRoutes = require('./routes/clientRoutes'); // Importe as rotas de clientes

const app = express();

connectDB(); // Conectar ao MongoDB

// Habilitar CORS para todas as rotas
app.use(cors());
app.use(express.json());

// Usar as rotas de clientes
app.use('/api', clientRoutes);

// Rota principal para verificação do funcionamento da API
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Definir a porta do servidor e iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
