const Client = require('../models/clientModel');
const asyncHandler = require('express-async-handler');

// Criar um novo cliente
exports.createClient = asyncHandler(async (req, res) => {
  const newClient = await Client.create(req.body);
  res.status(201).json({
    success: true,
    data: newClient
  });
});

// Obter todos os clientes
exports.getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find().select('-__v');
  res.status(200).json({
    success: true,
    count: clients.length,
    data: clients
  });
});

// Obter um cliente específico
exports.getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error('Cliente não encontrado');
  }
  res.status(200).json({
    success: true,
    data: client
  });
});

// Atualizar um cliente
exports.updateClient = asyncHandler(async (req, res) => {
  let client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error('Cliente não encontrado');
  }

  client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: client
  });
});

// Excluir um cliente
exports.deleteClient = asyncHandler(async (req, res) => {
  try {
    console.log(`Tentando excluir cliente com ID: ${req.params.id}`);
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      res.status(404).json({ success: false, message: 'Cliente não encontrado' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Cliente excluído com sucesso',
    });

    console.log(`Cliente com ID: ${req.params.id} foi excluído com sucesso`);
  } catch (error) {
    console.error(`Erro ao excluir cliente: ${error.message}`, error);
    res.status(500).json({
      success: false,
      error: error.message, // Exibir a mensagem de erro detalhada
    });
  }
});


// Buscar clientes por nome ou email
exports.searchClients = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const clients = await Client.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).select('-__v');

  res.status(200).json({
    success: true,
    count: clients.length,
    data: clients
  });
});
