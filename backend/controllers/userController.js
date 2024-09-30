const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Buscar o perfil do usuário logado
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// Atualizar o perfil do usuário logado
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`; // Salva o caminho da imagem
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error('Usuário não encontrado');
  }
});
