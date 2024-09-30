const express = require('express');
const {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
  searchClients
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Aplicar o middleware 'protect' para proteger as rotas
router.route('/')
  .post(protect, createClient) // Criação de clientes protegida
  .get(protect, getClients); // Listagem de clientes protegida

router.route('/:id')
  .get(protect, getClient) // Obter um cliente específico
  .put(protect, updateClient) // Atualizar cliente protegido
  .delete(protect, deleteClient); // Excluir cliente protegido

router.route('/search')
  .get(protect, searchClients); // Busca de clientes protegida

module.exports = router;
