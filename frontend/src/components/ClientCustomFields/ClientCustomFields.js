// Arquivo: ClientCustomFields.js

import React from 'react';
import { motion } from 'framer-motion';

const ClientCustomFields = ({ customFields }) => {
  return (
    <motion.div
      className="client-custom-fields p-6 bg-gray-800 rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-4">Campos Personalizados</h3>
      {customFields.length > 0 ? (
        <ul className="list-disc ml-6">
          {customFields.map((field, index) => (
            <li key={index} className="mb-1">
              <strong>{field.fieldName}:</strong> {field.fieldValue}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum campo personalizado adicionado.</p>
      )}
    </motion.div>
  );
};

export default ClientCustomFields;
