const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { protect, authorize } = require('../middleware/auth');

// Rotas públicas
router.get('/search', clientController.searchClients);

// Rotas protegidas
// Rotas para todos os usuários autenticados
router
  .route('/')
  .get(clientController.getClients)
  .post(clientController.createClient);

  router
  .route('/:id')
  .get(clientController.getClient)
  .put(clientController.updateClient)
  .delete(clientController.deleteClient); // Remover authorize('admin', 'manager') temporariamente


module.exports = router;
