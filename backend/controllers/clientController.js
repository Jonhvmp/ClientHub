const Client = require('../models/clientModel');
const asyncHandler = require('express-async-handler');

// Criar um novo cliente
exports.createClient = asyncHandler(async (req, res) => {
  try {
    console.log('Recebendo dados do cliente:', req.body); // Log para inspecionar os dados
    const { name, email, phone, company, address, tags, subscriptionType, subscriptionStatus, customFields } = req.body;

    // Certifique-se de que todos os campos obrigatórios estão presentes
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }

    // Verifica se já existe um cliente com o mesmo email e userId
    const existingClient = await Client.findOne({ email, userId: req.user._id });
    if (existingClient) {
      return res.status(400).json({ message: 'Cliente com este email já existe para este usuário.' });
    }

    // Cria o novo cliente se não existir duplicado
    const client = await Client.create({
      name,
      email,
      phone,
      company,
      address,
      tags,
      subscriptionType,
      subscriptionStatus,
      customFields,
      userId: req.user._id // Certifique-se de salvar o userId também
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);

    // Trata erros de chave duplicada
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cliente com este email já existe.' });
    }

    res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
  }
});


// Obter todos os clientes do usuário autenticado
exports.getClients = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query; // Paginação opcional

  const clients = await Client.find({ userId })
    .select('-__v')
    .limit(limit * 1) // Limitar o número de clientes retornados
    .skip((page - 1) * limit); // Pular registros baseados na página

  const total = await Client.countDocuments({ userId }); // Contar o total de clientes para o usuário

  res.status(200).json({
    success: true,
    count: clients.length,
    total, // Total de clientes disponíveis
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: clients,
  });
});

// Obter um cliente específico associado ao usuário autenticado
exports.getClient = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const client = await Client.findOne({ _id: req.params.id, userId });

  if (!client) {
    return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
  }

  res.status(200).json({
    success: true,
    data: client,
  });
});

// Atualizar um cliente (apenas se ele pertencer ao usuário)
exports.updateClient = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let client = await Client.findOne({ _id: req.params.id, userId });

  if (!client) {
    return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
  }

  client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: client,
  });
});

// Excluir um cliente (apenas se ele pertencer ao usuário)
exports.deleteClient = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const client = await Client.findOneAndDelete({ _id: req.params.id, userId });

  if (!client) {
    return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
  }

  res.status(200).json({
    success: true,
    message: 'Cliente excluído com sucesso',
  });
});

// Buscar clientes por nome ou email (apenas dentro dos clientes do usuário autenticado)
exports.searchClients = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query; // Adicionar paginação
  const userId = req.user._id;

  const clients = await Client.find({
    userId,
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ],
  })
    .select('-__v')
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Client.countDocuments({
    userId,
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ],
  });

  res.status(200).json({
    success: true,
    count: clients.length,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    data: clients,
  });
});
