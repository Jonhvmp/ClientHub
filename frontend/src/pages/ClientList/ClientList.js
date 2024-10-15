import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useClientList from '../../hooks/useClientList/useClientList';
import ClientsTable from '../../components/ClientsTable/ClientsTable';
import '../../assets/css/ClientList/ClientList.css';

const ClientList = () => {
  const {
    clients,
    loading,
    error,
    currentPage,
    clientsPerPage,
    totalClients,
    setCurrentPage,
    handleDeleteClient,
  } = useClientList();
  const navigate = useNavigate();
  const deleteLoading = false;

  const handleAddClient = () => {
    navigate('/clients/create');
  };

  const handleEditClient = (id) => {
    navigate(`/clients/${id}/edit`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Configuração da animação avançada do título
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 10, duration: 0.8 },
    },
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen text-white text-3xl"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.h1 className="text-5xl font-bold mb-8" variants={titleVariants}>
          Carregando...
        </motion.h1>
      </motion.div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-8">{error}</div>;
  }

  return (
    <motion.div
      style={{ paddingTop: '200px' }}
      className="client-list-container bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-8"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        variants={titleVariants}
      >
        Clientes
      </motion.h1>

      <motion.div className="actions flex gap-4 mb-8 justify-center">
        <motion.button
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-800 transition-transform transform hover:scale-105 "
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

        <motion.button
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate('/dashboard')}
        >
          Voltar ao Dashboard
        </motion.button>
      </motion.div>

      {clients.length === 0 ? (
        <p className="text-center text-xl mt-8">Nenhum cliente encontrado.</p>
      ) : (
        <>
          {/* Tabela de Clientes */}
          <ClientsTable
            clients={clients}
            handleEditClient={handleEditClient}
            handleDeleteClient={handleDeleteClient}
            deleteLoading={deleteLoading}
          />

          <Pagination
            clientsPerPage={clientsPerPage}
            totalClients={totalClients}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </motion.div>
  );
};

// Componente de Paginação
const Pagination = ({ clientsPerPage, totalClients, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center mt-8">
      <ul className="flex gap-2">
        {pageNumbers.map((number) => (
          <li key={number} className={`${currentPage === number ? 'active' : ''}`}>
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number ? 'bg-blue-600' : 'bg-gray-600'
              } text-white py-2 px-4 rounded-lg transition hover:bg-blue-700`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
