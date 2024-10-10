// Arquivo: ClientForm.js

import React from 'react';
import { motion } from 'framer-motion';
import { User, EnvelopeSimple, Phone, Buildings, Tag } from 'phosphor-react';

const iconVariants = {
  hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  visible: { pathLength: 1, fill: "rgba(255, 255, 255, 1)", transition: { duration: 1.5 } },
};

const ClientForm = ({ formData, handleInputChange }) => {
  return (
    <motion.form
      className="w-full max-w-md bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="form-group mb-4 flex items-center gap-3">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <User size={24} weight="bold" />
        </motion.div>
        <label className="block text-sm font-medium">Nome*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          required
          placeholder="Ex: Jonh Alex"
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
      </div>

      <div className="form-group mb-4 flex items-center gap-3">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <EnvelopeSimple size={24} weight="bold" />
        </motion.div>
        <label className="block text-sm font-medium">Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          required
          placeholder="Ex: username@gmail.com"
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
      </div>

      <div className="form-group mb-4 flex items-center gap-3">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <Phone size={24} weight="bold" />
        </motion.div>
        <label className="block text-sm font-medium">Telefone*</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          required
          placeholder="Ex: (99) 99999-9999"
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
      </div>

      <div className="form-group mb-4 flex items-center gap-3">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <Buildings size={24} weight="bold" />
        </motion.div>
        <label className="block text-sm font-medium">Empresa</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Ex: ACME Inc."
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
      </div>

      <div className="form-group mb-4 flex items-center gap-3">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <Tag size={24} weight="bold" />
        </motion.div>
        <label className="block text-sm font-medium">Tags (separadas por vírgula)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Ex: importante, lead, vip"
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
      </div>
    </motion.form>
  );
};

export default ClientForm;
