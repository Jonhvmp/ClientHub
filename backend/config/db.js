const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env do frontend

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { // Conectar ao MongoDB
      useNewUrlParser: true, // Evitar alertas de depreciação
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB estabelecida!');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    process.exit(1); // Encerrar o aplicativo em caso de falha
};
}

module.exports = connectDB; // Exportar a função de conexão
