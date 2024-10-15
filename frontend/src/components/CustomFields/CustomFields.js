// Arquivo: CustomFields.js

import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ListDashes } from 'phosphor-react';

const iconVariants = {
  hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  visible: { pathLength: 1, fill: "rgba(0, 122, 255, 1)", transition: { duration: 1.5 } },
};

const CustomFields = ({ customField, formData, handleCustomFieldChange, addCustomField }) => {
  return (
    <motion.div
      className="custom-fields w-full max-w-md bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="text-blue-500"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <ListDashes size={28} weight="bold" />
        </motion.div>
        <h3 className="text-lg font-semibold">Campos Personalizados</h3>
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        className="form-group mb-4 flex items-center gap-4">
        <input
          type="text"
          name="fieldName"
          placeholder="Nome do campo"
          value={customField.fieldName}
          onChange={handleCustomFieldChange}
          className="flex-1 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
        <input
          type="text"
          name="fieldValue"
          placeholder="Valor do campo"
          value={customField.fieldValue}
          onChange={handleCustomFieldChange}
          className="flex-1 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          style={{ backgroundColor: '#121928', color: 'white' }}
        />
        <motion.button
          type="button"
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={addCustomField}
        >
          <PlusCircle size={20} weight="fill" />
          Adicionar
        </motion.button>
      </div>

      {formData.customFields.length > 0 && (
        <div className="custom-fields-list mt-4">
          <h4 className="text-md font-semibold mb-2 flex items-center gap-3">
            <motion.div
              className="text-green-500"
              initial="hidden"
              animate="visible"
              variants={iconVariants}
            >
              <ListDashes size={20} weight="bold" />
            </motion.div>
            Campos Personalizados Adicionados:
          </h4>
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {formData.customFields.map((field, index) => (
              <motion.li
                key={index}
                className="mb-1 text-gray-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <strong>{field.fieldName}:</strong> {field.fieldValue}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}
    </motion.div>
  );
};

export default CustomFields;
