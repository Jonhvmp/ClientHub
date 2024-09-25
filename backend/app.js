const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Esta é a mensagem enviada ao frontend!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

