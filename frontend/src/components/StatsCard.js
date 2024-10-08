// Arquivo: StatsCard.js

import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, gradient }) => {
  return (
    <motion.div
      className={`p-6 ${gradient} text-white rounded-xl shadow-xl`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-4xl font-extrabold">{value}</p>
    </motion.div>
  );
};

export default StatsCard;
