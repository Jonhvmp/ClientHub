// Arquivo: StatsCard.js

import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, gradient }) => {
  return (
    <motion.div
      className={`p-6 ${gradient} text-white rounded-xl shadow-xl transform perspective-1000`}
      whileHover={{
        scale: 1.1,
        rotateY: 15,
        rotateX: 15,
        translateZ: 50,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      }}
      initial={{ rotateY: 0, rotateX: 0, translateZ: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
    >
      <motion.h3
        className="text-xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-4xl font-extrabold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

export default StatsCard;
