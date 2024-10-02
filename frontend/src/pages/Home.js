import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Usar a instância personalizada do Axios
import '../assets/css/Home.css';

function Home() {
  const [clients, setClients] = useState([]); // Inicializar como array vazia
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token'); // Certifique-se de que o token está sendo armazenado corretamente
      const config = {
        headers: {
          Authorization: `jwt ${token}`,
        },
      };
      const response = await api.get('/api/clients', config); // Usando a instância 'api'
      setClients(response.data.data); // Atribua o valor correto vindo da API
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  const deleteClient = async (id) => {
    try {
      await api.delete(`/api/clients/${id}`);
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
      <p className="p-total-clientes">Quantidade de clientes: {clients.length}</p>
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
