// Arquivo: CustomFields.js

import React from 'react';

const CustomFields = ({ customField, formData, handleCustomFieldChange, addCustomField }) => {
  return (
    <div className="custom-fields w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Campos Personalizados</h3>
      <div className="form-group mb-4 flex items-center gap-4">
        <input
          type="text"
          name="fieldName"
          placeholder="Nome do campo"
          value={customField.fieldName}
          onChange={handleCustomFieldChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="text"
          name="fieldValue"
          placeholder="Valor do campo"
          value={customField.fieldValue}
          onChange={handleCustomFieldChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={addCustomField}
        >
          Adicionar
        </button>
      </div>
      {formData.customFields.length > 0 && (
        <div className="custom-fields-list mt-4">
          <h4 className="text-md font-semibold mb-2">Campos Personalizados Adicionados:</h4>
          <ul>
            {formData.customFields.map((field, index) => (
              <li key={index} className="mb-1">
                <strong>{field.fieldName}:</strong> {field.fieldValue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomFields;
