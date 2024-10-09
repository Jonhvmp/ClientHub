// Arquivo: ClientDocuments.js

import React from 'react';
import { motion } from 'framer-motion';

const ClientDocuments = ({ documents }) => {
  return (
    <motion.div
      className="client-documents p-6 bg-gray-800 rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-4">Documentos Relacionados</h3>
      {documents && documents.length > 0 ? (
        <ul className="list-disc ml-6">
          {documents.map((doc, index) => (
            <li key={index} className="mb-1">
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum documento relacionado.</p>
      )}
    </motion.div>
  );
};

export default ClientDocuments;
