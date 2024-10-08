// Arquivo: Alert.js

import React from 'react';
import { motion } from 'framer-motion';

const Alert = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  return (
    <motion.div
      className={`${bgColor} text-white px-4 py-3 rounded-lg mb-4 w-full max-w-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="alert"
    >
      {message}
    </motion.div>
  );
};

export default Alert;
