const Client = require('../models/clientModel');

// Criar um novo cliente
exports.createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cliente', error });
  }
};

// Buscar todos os clientes
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar clientes', error });
  }
};

// Atualizar um cliente
exports.updateClient = async (req, res) => {
  // Lógica para atualizar um cliente
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cliente', error });
  }
};

// Excluir um cliente
exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir cliente', error });
  }
};
