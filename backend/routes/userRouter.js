const express = require('express');
const { protect } = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const upload = require('../middleware/multerConfig'); // Importar o multerConfig

const router = express.Router();

// Rota para visualizar o perfil do usuário
router.get('/profile', protect, getUserProfile);

// Rota para atualizar o perfil do usuário, incluindo upload de foto de perfil
router.put('/profile', protect, upload.single('profilePicture'), updateUserProfile);

module.exports = router;
