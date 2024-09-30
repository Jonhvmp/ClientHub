const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { protect } = require('../middleware/auth');

// Rotas protegidas por autenticação
// router.route('/')
//   .get(clientController.getClients) // Sem o `protect` para testar
//   .post(clientController.createClient);

router.route('/')
  .get(protect, clientController.getClients) // Listagem de clientes
  .post(protect, clientController.createClient); // Criação de clientes

router.route('/:id')
  .get(protect, clientController.getClient) // Visualização de cliente específico
  .put(protect, clientController.updateClient) // Edição de cliente
  .delete(protect, clientController.deleteClient); // Exclusão de cliente

router.route('/search')
  .get(protect, clientController.searchClients); // Busca de clientes

module.exports = router;
