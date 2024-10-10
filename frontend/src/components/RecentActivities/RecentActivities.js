// Arquivo: RecentActivities.js

import React from 'react';
import { motion } from 'framer-motion';

const RecentActivities = ({ clients }) => {
  const historyVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="recent-activities mt-12">
      <h2 className="text-3xl text-red-700 font-bold mb-6">Atividades Recentes</h2>
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
  );
};

export default RecentActivities;
