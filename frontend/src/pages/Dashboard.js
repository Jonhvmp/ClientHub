import { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import StatsCard from '../components/StatsCard';
import ClientsTable from '../components/ClientsTable';
import RecentActivities from '../components/RecentActivities';
import '../assets/css/Dashboard.css';

const Dashboard = () => {
  const { clients, fetchClients, loading, error, metrics } = useDashboard();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAddClient = () => {
    navigate('/clients/create');
  };

  const handleEditClient = (id) => {
    navigate(`/clients/${id}/edit`);
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        setDeleteLoading(true);
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
        fetchClients();
      } catch (err) {
        alert('Erro ao excluir o cliente. Tente novamente mais tarde.');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white text-3xl">Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  // Configuração da animação avançada do título
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 10, duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="dashboard-container bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-8"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        variants={titleVariants}
      >
        Dashboard
      </motion.h1>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        <StatsCard title="Clientes Ativos" value={metrics.activeClients} gradient="bg-gradient-to-r from-green-400 to-green-600" />
        <StatsCard title="Clientes Inativos" value={metrics.inactiveClients} gradient="bg-gradient-to-r from-red-400 to-red-600" />
        <StatsCard title="Clientes Pendentes" value={metrics.pendingClients} gradient="bg-gradient-to-r from-yellow-400 to-yellow-600" />
        <StatsCard title="Total de Clientes" value={metrics.totalClients} gradient="bg-gradient-to-r from-blue-400 to-blue-600" />
        <StatsCard title="Último Cliente Adicionado" value={metrics.lastAdded} gradient="bg-gradient-to-r from-purple-400 to-purple-600" />
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 mb-8">
        <motion.button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={handleAddClient}
        >
          Adicionar Cliente
        </motion.button>

        <motion.button
          className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate('/clients/search')}
        >
          Pesquisar Clientes
        </motion.button>
      </div>

      {/* Tabela de Clientes */}
      <ClientsTable clients={clients} handleEditClient={handleEditClient} handleDeleteClient={handleDeleteClient} deleteLoading={deleteLoading} />

      {/* Histórico de Atividades Recentes */}
      <RecentActivities clients={clients} />
    </motion.div>
  );
};

export default Dashboard;
