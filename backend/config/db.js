const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Carregar variáveis de ambiente

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Simplesmente use a URI sem as opções de conexão
    console.log('Conexão com o MongoDB estabelecida!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Sair do processo em caso de falha
  }
};

module.exports = connectDB;
