// Arquivo: ClientForm.js

import React from 'react';

const ClientForm = ({ formData, handleInputChange }) => {
  return (
    <form className="w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-lg mb-6">
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Nome*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Telefone*</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Empresa</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Ex: importante, lead, vip"
        />
      </div>
    </form>
  );
};

export default ClientForm;
