const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// Gerar um token fake para desenvolvimento
router.post('/fake-login', (req, res) => {
  const token = jwt.sign({ id: 'fakeUserId' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.json({
    success: true,
    token,
  });
});

module.exports = router;
