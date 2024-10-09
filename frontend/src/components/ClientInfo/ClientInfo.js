// Arquivo: ClientInfo.js

import React from 'react';
import { motion } from 'framer-motion';

const ClientInfo = ({ client }) => {
  return (
    <motion.div
      className="client-info p-6 bg-gray-800 rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-4">{client.name}</h2>
      <p className="mb-2"><strong>Email:</strong> {client.email}</p>
      <p className="mb-2"><strong>Telefone:</strong> {client.phone}</p>
      <p className="mb-2"><strong>Empresa:</strong> {client.company || 'Não especificado'}</p>
      <p className="mb-2"><strong>Tags:</strong> {client.tags || 'Nenhuma'}</p>
    </motion.div>
  );
};

export default ClientInfo;
