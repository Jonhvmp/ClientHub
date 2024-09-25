const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Definir rotas CRUD para clientes
router.post('/clientes', clientController.createClient);
router.get('/clientes', clientController.getClients);
router.put('/clientes/:id', clientController.updateClient);
router.delete('/clientes/:id', clientController.deleteClient);

module.exports = router;
