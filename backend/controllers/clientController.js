const Client = require('../models/clientModel');
const asyncHandler = require('express-async-handler');

// Função para calcular a data de término da assinatura com base na duração
const calculateSubscriptionEndDate = (startDate, duration) => {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + duration);
  return endDate;
};

// Criar um novo cliente
exports.createClient = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      address,
      tags,
      subscriptionType,
      subscriptionStatus,
      subscriptionDuration = 1, // Valor padrão para duração mensal
      customFields,
      status
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }

    const existingClient = await Client.findOne({ email, userId: req.user._id });
    if (existingClient) {
      return res.status(400).json({ message: 'Cliente com este email já existe para este usuário.' });
    }

    const subscriptionStartDate = new Date();
    const subscriptionEndDate = calculateSubscriptionEndDate(subscriptionStartDate, subscriptionDuration);

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      address,
      tags,
      subscriptionType,
      subscriptionStatus,
      subscriptionDuration,
      subscriptionStartDate,
      subscriptionEndDate,
      customFields,
      status,
      userId: req.user._id
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);

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

  const {
    subscriptionDuration,
    subscriptionStartDate = client.subscriptionStartDate,
  } = req.body;

  if (subscriptionDuration) {
    req.body.subscriptionEndDate = calculateSubscriptionEndDate(subscriptionStartDate, subscriptionDuration);
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

// Buscar clientes por nome, email ou tags (apenas dentro dos clientes do usuário autenticado)
exports.searchClients = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  const userId = req.user ? req.user._id : null;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
  }

  if (!query) {
    return res.status(400).json({ success: false, message: 'A query de busca é obrigatória.' });
  }

  try {
    console.log('Buscando clientes para o usuário:', userId, 'com a query:', query);

    const clients = await Client.find({
      userId,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    })
      .select('-__v')
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Client.countDocuments({
      userId,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({
      success: true,
      count: clients.length,
      total,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(total / limit),
      data: clients,
    });
  } catch (error) {
    console.error('Erro ao realizar a busca:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao realizar a busca. Tente novamente mais tarde.',
    });
  }
});
