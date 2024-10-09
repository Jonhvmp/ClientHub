import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useClientList from '../../hooks/useClientList/useClientList';
import '../../assets/css/ClientList/ClientList.css';
import ClientsTable from '../../components/ClientsTable/ClientsTable';

const ClientList = () => {
  const {
    clients,
    loading,
    error,
    // query,
    // setQuery,
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

  // const handleSearch = (event) => {
  //   setQuery(event.target.value);
  // };

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
    return <motion.div
      className="loading"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >

      <motion.h1 className="text-5xl font-bold mb-8 text-center loading"
        variants={titleVariants}
      >
        Carregando...
      </motion.h1>

    </motion.div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <motion.div className="client-list-container"
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

      <motion.div className="actions">
        <button className="btn-primary" onClick={handleAddClient}>
          Adicionar Cliente
        </button>
        <button className="btn-secondary" onClick={() => navigate('/clients/search')}>
        Pesquisar Clientes
        </button>
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
          Voltar ao Dashboard
        </button>
      </motion.div>

      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div> */}

      {clients.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <>
          {/* Tabela de Clientes */}
          <ClientsTable clients={clients} handleEditClient={handleEditClient} handleDeleteClient={handleDeleteClient} deleteLoading={deleteLoading} />

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
    <div className="pagination">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
