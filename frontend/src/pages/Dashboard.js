import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado para realizar chamadas à API
import '../assets/css/Dashboard.css'; // Arquivo CSS para estilização

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    activeClients: 0,
    inactiveClients: 0,
    pendingClients: 0,
    totalClients: 0,
  });

  const navigate = useNavigate();

  // Função para buscar dados dos clientes e atualizar o estado
  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token'); // Verifica se o token existe
      if (!token) {
        throw new Error('Token não encontrado, faça login novamente.');
      }

      // Adiciona o token JWT no cabeçalho da requisição
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Certifique-se de que o token é enviado corretamente
        },
      };
      console.log('Configuração de cabeçalho:', config);

      // Faz a requisição para buscar os clientes
      const response = await api.get('/api/clients', config); // Requisição protegida com token
      const { data } = response.data; // Extrai a propriedade 'data' da resposta da API

      // Adiciona um log para verificar o formato dos dados retornados
      console.log('Dados retornados pela API:', data);

      // Verifica se data é um array
      if (!Array.isArray(data)) {
        throw new Error('Os dados retornados não são um array.');
      }

      setClients(data); // Atualiza o estado com os dados dos clientes

      // Calcula métricas com base no status dos clientes
      const activeClients = data.filter(client => client.subscriptionStatus === 'ativo').length;
      const inactiveClients = data.filter(client => client.subscriptionStatus === 'inativo').length;
      const pendingClients = data.filter(client => client.subscriptionStatus === 'pendente').length;

      // Define as métricas no estado
      setMetrics({
        activeClients,
        inactiveClients,
        pendingClients,
        totalClients: data.length,
      });

      setLoading(false); // Define o estado de carregamento como falso
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Erro ao carregar os dados dos clientes. Tente novamente mais tarde.');
      setLoading(false); // Define o estado de carregamento como falso em caso de erro
    }
  };


  useEffect(() => {
    console.log('Fetching clients...');
    fetchClients(); // Chama a função de busca de clientes ao carregar o componente
  }, []); // useEffect com array de dependências vazio para executar apenas uma vez ao carregar o componente

  // Função para redirecionar para a página de adicionar cliente
  const handleAddClient = () => {
    navigate('/clients/create');
  };

  // Função para redirecionar para a página de edição de cliente
  const handleEditClient = (id) => {
    navigate(`/clients/${id}/edit`);
  };

  // Função para deletar cliente
  const handleDeleteClient = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await api.delete(`/api/clients/${id}`, config); // Exclui cliente protegido pelo token
        fetchClients(); // Atualiza a lista de clientes após a exclusão
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        setError('Erro ao excluir o cliente. Tente novamente.');
      }
    }
  };

  // Tratamento de estado de carregamento e erro
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
      </div>

      <div className="actions">
        <button className="btn-primary" onClick={handleAddClient}>
          Adicionar Cliente
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
    </div>
  );
};

export default Dashboard;
