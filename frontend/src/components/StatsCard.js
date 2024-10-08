// Arquivo: StatsCard.js

import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, fromColor, toColor }) => {
  return (
    <motion.div
      className={`p-6 bg-gradient-to-r from-${fromColor}-500 to-${toColor}-500 text-white rounded-xl shadow-xl`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-4xl font-extrabold">{value}</p>
    </motion.div>
  );
};

export default StatsCard;
