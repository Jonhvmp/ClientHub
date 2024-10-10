// Arquivo: SubscriptionFields.js

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarBlank, Timer } from 'phosphor-react';

const iconVariants = {
  hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  visible: { pathLength: 1, fill: "rgba(255, 255, 255, 1)", transition: { duration: 1.5 } },
};

const SubscriptionFields = ({ formData, setSubscriptionType, setSubscriptionDuration, setSubscriptionDurationUnit }) => {
  return (
    <motion.div
      className="w-full max-w-md bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="form-group mb-4 flex items-center gap-3">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <CalendarBlank size={28} weight="bold" />
        </motion.div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Tipo de Assinatura</label>
        <select
          name="subscriptionType"
          value={formData.subscriptionType}
          onChange={(e) => setSubscriptionType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          style={{ backgroundColor: '#121928', color: 'white' }}
        >
          <option value="mensal">Mensal (30 dias)</option>
          <option value="trimestral">Trimestral (90 dias)</option>
          <option value="semestral">Semestral (180 dias)</option>
          <option value="anual">Anual (365 dias)</option>
          <option value="personalizado">Personalizado</option>
        </select>
      </div>

      {formData.subscriptionType === "personalizado" && (
        <div className="form-group mb-4 flex items-center gap-3">
          <motion.div
            className="text-blue-500"
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <Timer size={28} weight="bold" />
          </motion.div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Duração da Assinatura</label>
          <div className="flex gap-4">
            <input
              type="number"
              name="subscriptionDuration"
              value={formData.subscriptionDuration}
              onChange={(e) => setSubscriptionDuration(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              style={{ backgroundColor: '#121928', color: 'white' }}
            />
            <select
              name="subscriptionDurationUnit"
              value={formData.subscriptionDurationUnit}
              onChange={(e) => setSubscriptionDurationUnit(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              style={{ backgroundColor: '#121928', color: 'white' }}
            >
              <option value="dias">Dias</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
              <option value="anos">Anos</option>
            </select>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionFields;
