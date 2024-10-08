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

// Defina a rota de busca antes da rota que lida com :id para evitar conflito
router.route('/clients/search')
  .get(protect, searchClients); // Busca de clientes protegida

router.route('/clients')
  .get(protect, getClients) // Listagem de clientes protegida
  .post(protect, createClient); // Criação de clientes protegida

router.route('/clients/:id')
  .get(protect, getClient) // Obter um cliente específico por ID
  .put(protect, updateClient) // Atualizar cliente protegido
  .delete(protect, deleteClient); // Excluir cliente protegido

module.exports = router;
