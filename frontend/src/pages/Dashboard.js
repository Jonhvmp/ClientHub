import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import api from '../services/api';
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

  const historyVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
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
        <motion.div
          className="p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl shadow-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-xl">Clientes Ativos</h3>
          <p className="text-4xl">{metrics.activeClients}</p>
        </motion.div>
        <motion.div
          className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl">Clientes Inativos</h3>
          <p className="text-4xl">{metrics.inactiveClients}</p>
        </motion.div>
        <motion.div
          className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl">Clientes Pendentes</h3>
          <p className="text-4xl">{metrics.pendingClients}</p>
        </motion.div>
        <motion.div
          className="p-6 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl">Total de Clientes</h3>
          <p className="text-4xl">{metrics.totalClients}</p>
        </motion.div>
        <motion.div
          className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl">Último Cliente Adicionado</h3>
          <p className="text-lg">{metrics.lastAdded}</p>
        </motion.div>
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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.table
          className="min-w-full text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <motion.tr
                key={client._id}
                className="hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4">{client.subscriptionStatus}</td>
                <td className="p-4 flex gap-2">
                  <motion.button
                    className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleEditClient(client._id)}
                  >
                    Editar
                  </motion.button>
                  <motion.button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDeleteClient(client._id)}
                  >
                    {deleteLoading ? 'Excluindo...' : 'Excluir'}
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Histórico de Atividades Recentes */}
      <div className="recent-activities mt-12">
        <h2 className="text-3xl font-bold mb-6">Atividades Recentes</h2>
        {clients.map((client) => (
          <motion.div
            key={client._id}
            className="p-4 mb-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            initial="hidden"
            animate="visible"
            variants={historyVariants}
          >
            <p className="text-gray-700">
              <strong>{client.name}</strong> foi atualizado em {new Date(client.updatedAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
