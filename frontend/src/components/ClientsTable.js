// Arquivo: ClientsTable.js

import React from 'react';
import { motion } from 'framer-motion';

const ClientsTable = ({ clients, handleEditClient, handleDeleteClient, deleteLoading }) => {
  return (
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
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Excluindo...' : 'Excluir'}
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default ClientsTable;
