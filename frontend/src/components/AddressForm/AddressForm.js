import React from 'react';
import { motion } from 'framer-motion';
import { House } from 'phosphor-react';

const iconVariants = {
  hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  visible: { pathLength: 1, fill: "rgba(255, 255, 255, 1)", transition: { duration: 1.5 } },
};

// Mapeamento dos campos em inglês para suas traduções em português
const fieldLabels = {
  street: 'Rua',
  city: 'Cidade',
  state: 'Estado',
  zipCode: 'CEP',
  country: 'País',
};

const AddressForm = ({ formData, handleAddressChange }) => {
  return (
    <motion.div
      className="address-group w-full max-w-md bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg mb-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <House size={32} weight="bold" />
        </motion.div>
        <h3 className="text-lg font-semibold">Endereço</h3>
      </div>
      {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
        <div key={field} className="form-group mb-4 flex items-center gap-3">
          <motion.div
            className="text-blue-500"
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <House size={20} weight="bold" />
          </motion.div>
          <label className="block text-sm font-medium">
            {fieldLabels[field]} {/* Usando o mapeamento para exibir o rótulo em português */}
          </label>
          <input
            type="text"
            name={field}
            value={formData.address[field]}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder={`Ex: ${fieldLabels[field]}`} // Placeholder também em português
            style={{ backgroundColor: '#121928', color: 'white' }}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default AddressForm;
