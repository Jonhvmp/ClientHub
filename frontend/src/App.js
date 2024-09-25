import React, { useState, useEffect } from 'react';
import api from './services/api'; // Arquivo api.js

function App() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subscriptionType: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Função para listar todos os clientes (GET)
  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clientes');  // Certifique-se de que a URL da API está correta
      setClients(response.data);  // Axios já converte a resposta para JSON automaticamente
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  // Função para adicionar um novo cliente (POST)
  const addClient = async () => {
    try {
      const response = await api.post('/api/clientes', form);
      setClients([...clients, response.data]);
      setForm({ name: '', email: '', phone: '', subscriptionType: '' });
    } catch (error) {
      console.error('Erro ao adicionar cliente', error);
    }
  };

  // Função para editar um cliente existente (PUT)
  const updateClient = async () => {
    try {
      const response = await api.put(`/api/clientes/${editId}`, form);
      setClients(
        clients.map(client => (client._id === editId ? response.data : client))
      );
      setForm({ name: '', email: '', phone: '', subscriptionType: '' });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error('Erro ao editar cliente', error);
    }
  };

  // Função para excluir um cliente (DELETE)
  const deleteClient = async (id) => {
    try {
      await api.delete(`/api/clientes/${id}`);
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    }
  };

  // Função para carregar os dados do cliente no formulário para edição
  const editClient = (client) => {
    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      subscriptionType: client.subscriptionType
    });
    setIsEditing(true);
    setEditId(client._id);
  };

  // Função para enviar o formulário, dependendo se é uma edição ou adição
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateClient();
    } else {
      addClient();
    }
  };

  useEffect(() => {
    fetchClients();  // Carregar a lista de clientes ao carregar o componente
  }, []);

  return (
    <div className="App">
      <h1>Gerenciamento de Clientes</h1>

      {/* Formulário para adicionar ou editar clientes */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />
        <select
          value={form.subscriptionType}
          onChange={e => setForm({ ...form, subscriptionType: e.target.value })}
          required
        >
          <option value="">Escolha o tipo de assinatura</option>
          <option value="mensal">Mensal</option>
          <option value="trimestral">Trimestral</option>
          <option value="semestral">Semestral</option>
          <option value="anual">Anual</option>
        </select>
        <button type="submit">{isEditing ? 'Atualizar Cliente' : 'Adicionar Cliente'}</button>
      </form>

      {/* Lista de clientes */}
      <h2>Lista de Clientes</h2>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            <strong>{client.name}</strong> - {client.email} - {client.phone} - Assinatura: {client.subscriptionType}
            <button onClick={() => editClient(client)}>Editar</button>
            <button onClick={() => deleteClient(client._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
