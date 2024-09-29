const Client = require('../models/clientModel');
const asyncHandler = require('express-async-handler');

// Criar um novo cliente
exports.createClient = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Obter o ID do usuário autenticado
  const newClientData = { ...req.body, userId }; // Associar o cliente ao usuário
  const newClient = await Client.create(newClientData);

  res.status(201).json({
    success: true,
    data: newClient
  });
});

// Obter todos os clientes do usuário autenticado
exports.getClients = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Obter o ID do usuário autenticado
  const clients = await Client.find({ userId }).select('-__v');

  res.status(200).json({
    success: true,
    count: clients.length,
    data: clients
  });
});

// Obter um cliente específico associado ao usuário autenticado
exports.getClient = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const client = await Client.findOne({ _id: req.params.id, userId }); // Garantir que o cliente pertence ao usuário

  if (!client) {
    res.status(404);
    throw new Error('Cliente não encontrado');
  }

  res.status(200).json({
    success: true,
    data: client
  });
});

// Atualizar um cliente (apenas se ele pertencer ao usuário)
exports.updateClient = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let client = await Client.findOne({ _id: req.params.id, userId });

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

// Excluir um cliente (apenas se ele pertencer ao usuário)
exports.deleteClient = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const client = await Client.findOneAndDelete({ _id: req.params.id, userId }); // Garantir que o cliente pertence ao usuário

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
      error: error.message,
    });
  }
});

// Buscar clientes por nome ou email (apenas dentro dos clientes do usuário autenticado)
exports.searchClients = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const userId = req.user.id; // Obter o ID do usuário autenticado
  const clients = await Client.find({
    userId, // Filtrar pelos clientes do usuário autenticado
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
