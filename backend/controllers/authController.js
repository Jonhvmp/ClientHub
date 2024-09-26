const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Login de usuário
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      success: true,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Credenciais inválidas');
  }
});
