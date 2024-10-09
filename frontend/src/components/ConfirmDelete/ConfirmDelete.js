// Arquivo: ConfirmDelete.js

import React from 'react';
import { motion } from 'framer-motion';

const ConfirmDelete = ({ client, handleDeleteClient, deleting, deleteError, navigate }) => {
  return (
    <motion.div
      className="client-delete-container bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        Excluir Cliente
      </motion.h1>

      {client ? (
        <motion.div
          className="confirmation-message mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Tem certeza que deseja excluir o cliente?</h2>
          <p className="text-lg mb-2"><strong>Nome:</strong> {client.name}</p>
          <p className="text-lg mb-2"><strong>Email:</strong> {client.email}</p>
          <p className="text-lg mb-4"><strong>Telefone:</strong> {client.phone}</p>
        </motion.div>
      ) : (
        <motion.p
          className="text-red-500 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Cliente não encontrado.
        </motion.p>
      )}

      {/* Mensagem de erro de exclusão */}
      {deleteError && (
        <motion.div
          className="error-message text-red-500 text-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {deleteError}
        </motion.div>
      )}

      {client && (
        <div className="actions flex gap-4">
          <motion.button
            className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            onClick={handleDeleteClient}
            disabled={deleting}
          >
            {deleting ? 'Excluindo...' : 'Confirmar Exclusão'}
          </motion.button>
          <motion.button
            className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/clients')}
          >
            Cancelar
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default ConfirmDelete;
