// Arquivo: FormButtons.js

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FloppyDisk } from 'phosphor-react';

const FormButtons = ({ handleSubmit, loading, navigate }) => {
  return (
    <motion.div
      className="form-buttons w-full max-w-md flex justify-between items-center mt-6"
      initial={{ opacity: 0, translateZ: -50 }}
      animate={{ opacity: 1, translateZ: 0 }}
      exit={{ opacity: 0, translateZ: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.button
        type="submit"
        className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FloppyDisk size={20} weight="fill" />
        {loading ? 'Salvando...' : 'Salvar Cliente'}
      </motion.button>
      <motion.button
        type="button"
        className="flex items-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
        onClick={() => navigate('/clients')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} weight="bold" />
        Cancelar
      </motion.button>
    </motion.div>
  );
};

export default FormButtons;
