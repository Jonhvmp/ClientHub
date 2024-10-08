// Arquivo: FormHeader.js

import React from 'react';
import { motion } from 'framer-motion';
import Alert from './Alert';

const FormHeader = ({ title, error }) => {
  return (
    <>
      <motion.h1
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
      >
        {title}
      </motion.h1>
      {error && <Alert message={error} type="error" />}
    </>
  );
};

export default FormHeader;
