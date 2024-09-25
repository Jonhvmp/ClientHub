import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients(); // Carregar clientes ao montar o componente
  }, []);

  // Função para buscar clientes
  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clientes');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  // Função para excluir um cliente
  const deleteClient = async (id) => {
    try {
      await api.delete(`/api/clientes/${id}`);
      fetchClients(); // Recarregar a lista de clientes após excluir
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    }
  };

  return (
    <div>
      <Link to="/add-client">Adicionar Cliente</Link>
      <h2>Lista de Clientes</h2>
      <p>Quantidade de clientes: {clients.length}</p>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            <strong>{client.name}</strong> - {client.email} - {client.phone} - Assinatura: {client.subscriptionType}
            <Link to={`/edit-client/${client._id}`}>Editar</Link>
            <button onClick={() => deleteClient(client._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
