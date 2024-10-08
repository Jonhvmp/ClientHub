// Arquivo: AddressForm.js

import React from 'react';

const AddressForm = ({ formData, handleAddressChange }) => {
  return (
    <div className="address-group w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Endereço</h3>
      {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
        <div key={field} className="form-group mb-4">
          <label className="block text-sm font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            name={field}
            value={formData.address[field]}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default AddressForm;
