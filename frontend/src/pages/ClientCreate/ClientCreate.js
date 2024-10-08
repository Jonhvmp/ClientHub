// Arquivo: ClientCreate.js

import React from 'react';
import { motion } from 'framer-motion';
import useClientCreate from '../../hooks/useClientCreate/useClientCreate';
import '../../assets/css/ClientCreate/ClientCreate.css';
import { useNavigate } from 'react-router-dom';
import FormHeader from '../../components/FormHeader/FormHeader';
import ClientForm from '../../components/ClientForm/ClientForm';
import AddressForm from '../../components/AddressForm/AddressForm';
import CustomFields from '../../components/CustomFields/CustomFields';
import FormButtons from '../../components/FormButtons/FormButtons';
import SubscriptionFields from '../../components/SubscriptionFields/SubscriptionFields';

const ClientCreate = () => {
  const navigate = useNavigate();
  const {
    formData,
    customField,
    error,
    loading,
    handleInputChange,
    handleAddressChange,
    handleCustomFieldChange,
    addCustomField,
    handleSubmit,
  } = useClientCreate();

  return (
    <div className="client-create-container bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 min-h-screen flex flex-col items-center">
      <FormHeader title="Adicionar Cliente" error={error} />
      <ClientForm formData={formData} handleInputChange={handleInputChange} />
      <AddressForm formData={formData} handleAddressChange={handleAddressChange} />
      <CustomFields
        customField={customField}
        formData={formData}
        handleCustomFieldChange={handleCustomFieldChange}
        addCustomField={addCustomField}
      />
      <motion.div className='subscriptDiv'>
        <SubscriptionFields formData={formData} handleInputChange={handleInputChange} />
      </motion.div>

      <FormButtons handleSubmit={handleSubmit} loading={loading} navigate={navigate} />
    </div>
  );
};

export default ClientCreate;
