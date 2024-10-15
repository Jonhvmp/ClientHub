import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useClientSearch from '../../hooks/useClientSearch/useClientSearch';

const ClientSearch = () => {
  const { query, clients, loading, error, handleSearchChange } = useClientSearch();
  const navigate = useNavigate();

  const renderClients = () => {
    if (loading) {
      return (
        <motion.div
          className="loading text-white text-xl flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Buscando clientes...
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="error-message text-red-500 text-xl text-center mt-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      );
    }

    if (clients.length === 0 && query.trim() !== '') {
      return (
        <motion.div
          style={{ paddingTop: '200px' }}
          className="no-results text-yellow-500 text-xl text-center mt-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          Nenhum cliente encontrado.
        </motion.div>
      );
    }

    return (
      <motion.ul
        className="client-list grid gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {clients.map((client) => (
          <motion.li
            key={client._id}
            className="p-6 bg-gray-800 text-white rounded-xl shadow-xl transform transition hover:scale-105"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ rotateY: 10 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          >
            <h3 className="text-2xl font-bold mb-2">{client.name}</h3>
            <p className="mb-1">
              <strong>Email:</strong> {client.email}
            </p>
            <p className="mb-4">
              <strong>Tags:</strong> {client.tags || 'Nenhuma'}
            </p>
            <div className="client-actions flex gap-4">
              {client._id && (
                <>
                  <motion.button
                    className="btn-view bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate(`/clients/${client._id}/details`)}
                  >
                    Ver Detalhes
                  </motion.button>
                  <motion.button
                    className="btn-edit bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate(`/clients/${client._id}/edit`)}
                  >
                    Editar Cliente
                  </motion.button>
                </>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  return (
    <motion.div
      className="client-search-container min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10, duration: 0.8 }}
      >
        Buscar Clientes
      </motion.h1>

      <motion.div
        className="search-bar flex justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <input
          type="text"
          className="w-full max-w-md p-4 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Buscar por nome, email ou tags"
          value={query}
          onChange={handleSearchChange}
        />
      </motion.div>

      {/* Renderização dos resultados ou estado de busca */}
      {renderClients()}
    </motion.div>
  );
};

export default ClientSearch;
