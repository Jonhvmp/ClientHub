// Arquivo: FormButtons.js

import React from 'react';
import { motion } from 'framer-motion';

const FormButtons = ({ handleSubmit, loading, navigate }) => {
  return (
    <motion.div
      className="form-buttons w-full max-w-md flex justify-between items-center mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        type="submit"
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.1 }}
      >
        {loading ? 'Salvando...' : 'Salvar Cliente'}
      </motion.button>
      <motion.button
        type="button"
        className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
        onClick={() => navigate('/clients')}
        whileHover={{ scale: 1.1 }}
      >
        Cancelar
      </motion.button>
    </motion.div>
  );
};

export default FormButtons;
