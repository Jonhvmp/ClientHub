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
    <>
      {/* Tipo de Assinatura */}
      <motion.div
        className="form-group mb-6"
        initial={{ opacity: 0, translateZ: -50 }}
        animate={{ opacity: 1, translateZ: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Assinatura</label>
        <div className="flex items-center gap-2">
          <motion.div
            className="text-indigo-500"
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <CalendarBlank size={24} weight="bold" />
          </motion.div>
          <select
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="mensal">Mensal</option>
            <option value="personalizado">Personalizado</option>
          </select>
        </div>
      </motion.div>

      {/* Duração da Assinatura */}
      {formData.subscriptionType === 'personalizado' && (
        <motion.div
          className="form-group mb-6"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">Duração da Assinatura</label>
          <div className="flex gap-4 items-center">
            <motion.div
              className="text-indigo-500"
              initial="hidden"
              animate="visible"
              variants={iconVariants}
            >
              <Timer size={24} weight="bold" />
            </motion.div>
            <input
              type="number"
              name="subscriptionDuration"
              value={formData.subscriptionDuration}
              onChange={(e) => setSubscriptionDuration(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <select
              name="subscriptionDurationUnit"
              value={formData.subscriptionDurationUnit}
              onChange={(e) => setSubscriptionDurationUnit(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="dias">Dias</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
              <option value="anos">Anos</option>
            </select>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SubscriptionFields;
