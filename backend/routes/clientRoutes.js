const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const protect = require('../middleware/authMiddleware'); // Certifique-se de importar o middleware correto

// Rotas públicas
router.get('/search', clientController.searchClients); // Permite busca de clientes

// Rotas protegidas (usuários autenticados)
router
  .route('/')
  .get(protect, clientController.getClients) // Usuário deve estar autenticado para listar os próprios clientes
  .post(protect, clientController.createClient); // Usuário deve estar autenticado para criar clientes

router
  .route('/:id')
  .get(protect, clientController.getClient) // Usuário deve estar autenticado para ver um cliente
  .put(protect, clientController.updateClient) // Usuário deve estar autenticado para atualizar um cliente
  .delete(protect, clientController.deleteClient); // Usuário deve estar autenticado para excluir um cliente

module.exports = router;
