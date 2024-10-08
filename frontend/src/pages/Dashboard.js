import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import '../assets/css/Dashboard.css';
import api from '../services/api';

const Dashboard = () => {
  const { clients, fetchClients ,loading, error, metrics } = useDashboard();
  const navigate = useNavigate();

  const handleAddClient = () => {
    navigate('/clients/create');
  };

  const handleEditClient = (id) => {
    navigate(`/clients/${id}/edit`);
  };

 const handleDeleteClient = async (id) => {
  if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado, faça login novamente.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.delete(`/api/clients/${id}`, config);

      if (response.status !== 200) {
        throw new Error('Erro ao excluir o cliente.');
      }

      alert('Cliente excluído com sucesso.');

      // Atualiza a lista de clientes sem recarregar a página
      fetchClients(); // Chama a função que busca os clientes novamente
    } catch (err) {
      alert('Erro ao excluir o cliente. Tente novamente mais tarde.');
    }
  }
};

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="metrics-container">
        <div className="metric-box">
          <h3>Clientes Ativos</h3>
          <p>{metrics.activeClients}</p>
        </div>
        <div className="metric-box">
          <h3>Clientes Inativos</h3>
          <p>{metrics.inactiveClients}</p>
        </div>
        <div className="metric-box">
          <h3>Clientes Pendentes</h3>
          <p>{metrics.pendingClients}</p>
        </div>
        <div className="metric-box">
          <h3>Total de Clientes</h3>
          <p>{metrics.totalClients}</p>
        </div>
        <div className="metric-box">
          <h3>Último Cliente Adicionado</h3>
          <p>{metrics.lastAdded}</p>
        </div>
      </div>

      <div className="actions">
        <button className="btn-primary" onClick={handleAddClient}>
          Adicionar Cliente
        </button>

        {/* Botão de pesquisar clientes */}
        <button className="btn-secondary" onClick={() => navigate('/clients/search')}>
        Pesquisar Clientes
      </button>
      </div>

      <div className="clients-list">
        <h2>Lista de Clientes</h2>
        {clients.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          <table className="clients-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
                {clients.map(client => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.subscriptionStatus}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditClient(client._id)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteClient(client._id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        )}
        </div>
        {/* Exibir atividades recentes */}
        <div className="recent-activities">
          <h2>Atividades Recentes</h2>
          {clients.map(client => (
            <div key={client._id}>
              <p><strong>
                {client.name}
              </strong> foi atualizado em {new Date(client.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Dashboard;
