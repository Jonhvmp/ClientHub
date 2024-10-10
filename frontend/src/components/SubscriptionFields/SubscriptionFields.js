// Arquivo: SubscriptionFields.js

import React from 'react';

const SubscriptionFields = ({ formData, handleInputChange }) => {
  return (
    <>
             {/* Tipo e status da assinatura */}
        <div className="form-group mb-4">
          <label className="block mb-2">Tipo de Assinatura</label>
          <select
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={handleInputChange}
            className="w-full text-blue-800 p-3 border border-blue-300 rounded-md"
          >
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
            <option value="semestral">Semestral</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2">Duração da Assinatura (em meses)</label>
          <input
            type="number"
            name="subscriptionDuration"
            value={formData.subscriptionDuration}
            onChange={handleInputChange}
            className="w-full text-blue-800 p-3 border border-blue-300 rounded-md"
          />
        </div>
    </>
  );
};

export default SubscriptionFields;
