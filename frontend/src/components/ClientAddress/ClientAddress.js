// Arquivo: ClientAddress.js

import React from 'react';
import { motion } from 'framer-motion';

// Mapeamento dos campos do endereço para suas traduções em português
const fieldLabels = {
  street: 'Rua',
  city: 'Cidade',
  state: 'Estado',
  zipCode: 'CEP',
  country: 'País',
};

const ClientAddress = ({ address }) => {
  return (
    <motion.div
      className="client-address p-6 bg-gray-800 rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-4">Endereço</h3>
      <p>
        <strong>{fieldLabels.street}:</strong> {address.street}, <strong>{fieldLabels.city}:</strong> {address.city}
      </p>
      <p>
        <strong>{fieldLabels.state}:</strong> {address.state}, <strong>{fieldLabels.zipCode}:</strong> {address.zipCode}
      </p>
      <p>
        <strong>{fieldLabels.country}:</strong> {address.country}
      </p>
    </motion.div>
  );
};

export default ClientAddress;
