// Arquivo: ClientAddress.js

import React from 'react';
import { motion } from 'framer-motion';

const ClientAddress = ({ address }) => {
  return (
    <motion.div
      className="client-address p-6 bg-gray-800 rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-4">Endereço</h3>
      <p>{address.street}, {address.city}</p>
      <p>{address.state}, {address.zipCode}</p>
      <p>{address.country}</p>
    </motion.div>
  );
};

export default ClientAddress;
