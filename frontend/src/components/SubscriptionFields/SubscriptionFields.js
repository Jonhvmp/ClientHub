// Arquivo: SubscriptionFields.js

import React from 'react';

const SubscriptionFields = ({ formData, handleInputChange }) => {
  return (
    <>
      {/* Campo para Tipo de Assinatura */}
      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-200 mb-2">Tipo de Assinatura</label>
        <select
          name="subscriptionType"
          value={formData.subscriptionType}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="mensal">Mensal</option>
          <option value="trimestral">Trimestral</option>
          <option value="semestral">Semestral</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      {/* Campo para Status */}
      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="pendente">Pendente</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
    </>
  );
};

export default SubscriptionFields;
