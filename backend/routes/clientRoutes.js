const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { protect, authorize } = require('../middleware/auth');

// Rotas públicas
router.get('/search', clientController.searchClients);

// Rotas protegidas
router.use(protect); // Certifique-se de que o `protect` está correto

// Rotas para todos os usuários autenticados
router
  .route('/')
  .get(clientController.getClients)
  .post(clientController.createClient);

router
  .route('/:id')
  .get(clientController.getClient)
  .put(clientController.updateClient)
  .delete(authorize('admin', 'manager'), clientController.deleteClient);

module.exports = router;
