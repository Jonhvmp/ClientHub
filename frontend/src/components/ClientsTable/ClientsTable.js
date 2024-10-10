// Arquivo: ClientsTable.js

import React from 'react';
import { motion } from 'framer-motion';
import { PencilSimple, Trash } from 'phosphor-react';

const ClientsTable = ({ clients, handleEditClient, handleDeleteClient, deleteLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <motion.table
        className="min-w-full text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-4 text-center">Nome</th>
            <th className="p-4 text-center">Email</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <motion.tr
              key={client._id}
              className={`transition-all ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
              whileHover={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.3)', backgroundColor: 'transparent' , backdropFilter: 'blur(100px)' }}
            >
              <td className="p-4 text-center">{client.name}</td>
              <td className="p-4 text-center">{client.email}</td>
              <td className="p-4 text-center">{client.status}</td>
              <td className="p-4 flex justify-center gap-4">
                <motion.button
                  className="bg-green-500 text-white py-2 px-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  onClick={() => handleEditClient(client._id)}
                >
                  <PencilSimple size={24} weight="bold" className="hover:text-black transition-colors" />
                </motion.button>
                <motion.button
                  className="bg-red-500 text-white py-2 px-3 rounded-lg shadow-lg hover:bg-red-600 transition-transform"
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  onClick={() => handleDeleteClient(client._id)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    'Excluindo...'
                  ) : (
                    <Trash size={24} weight="bold" className="hover:text-black transition-colors" />
                  )}
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
