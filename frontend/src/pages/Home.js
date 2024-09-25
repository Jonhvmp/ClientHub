import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/Home.css';

function Home() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients(); // Carregar clientes ao montar o componente
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clientes');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  const deleteClient = async (id) => {
    try {
      await api.delete(`/api/clientes/${id}`);
      fetchClients(); // Recarregar a lista de clientes após excluir
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Gerenciamento de Clientes</h1>
        <Link to="/add-client" className="btn-add-client">Adicionar Cliente</Link>
      </header>

      <h2>Lista de Clientes</h2>
      <p>Quantidade de clientes: {clients.length}</p>
      <ul className="client-list">
        {clients.map(client => (
          <li key={client._id} className="client-item">
            <span><strong>{client.name}</strong> - {client.email} - {client.phone} - Assinatura: {client.subscriptionType}</span>
            <div className="actions">
              <Link to={`/edit-client/${client._id}`} className="btn-edit">Editar</Link>
              <button onClick={() => deleteClient(client._id)} className="btn-delete">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
