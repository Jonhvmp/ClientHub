import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FloppyDisk, ArrowLeft, Plus } from 'phosphor-react';
import useClientEdit from '../../hooks/useClientEdit/useClientEdit';
import dayjs from 'dayjs';
import '../../assets/css/ClientEdit/ClientEdit.css';

const ClientEdit = () => {
  const { id } = useParams();
  const {
    formData,
    customField,
    loading,
    error,
    updateError,
    handleInputChange,
    handleAddressChange,
    handleCustomFieldChange,
    addCustomField,
    handleSubmit,
    expirationDate,
    calculateExpirationDate,
  } = useClientEdit(id);

  const [subscriptionType, setSubscriptionType] = useState(formData.subscriptionType || 'mensal');
  const [subscriptionDuration, setSubscriptionDuration] = useState(formData.subscriptionDuration || 1);
  const [subscriptionDurationUnit, setSubscriptionDurationUnit] = useState(formData.subscriptionDurationUnit || 'meses');

  useEffect(() => {
    if (subscriptionType === 'personalizado') {
      calculateExpirationDate(subscriptionDuration, subscriptionDurationUnit);
    }
  }, [subscriptionType, subscriptionDuration, subscriptionDurationUnit, calculateExpirationDate]);

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen text-white text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Carregando dados do cliente...
      </motion.div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-4">{error}</div>;
  }

  return (
    <motion.div
      style={{ paddingTop: '200px' }}
      className="client-edit-container bg-gradient-to-b from-gray-900 to-gray-800 text-black min-h-screen p-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10, duration: 0.8 }}
      >
        Editar Cliente
      </motion.h1>

      {updateError && <div className="text-red-500 text-xl mb-4 text-center">{updateError}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
        {/* Informações básicas */}
        <motion.div
          className="form-group"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <label className="block text-sm font-medium text-#111827 mb-2">Nome*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <label className="block text-sm font-medium text-#111827 mb-2">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <label className="block text-sm font-medium text-#111827 mb-2">Telefone*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Endereço */}
        <motion.div
          className="address-group"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mt-6 mb-4">Endereço</h3>
          {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
            <div key={field} className="form-group mb-4">
              <label className="block text-sm font-medium text-#111827 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData.address[field]}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          ))}
        </motion.div>

        {/* Tipo e duração da assinatura */}
        <motion.div
          className="form-group"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <label className="block text-sm font-medium text-#111827 mb-2">Tipo de Assinatura</label>
          <select
            name="subscriptionType"
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="mensal">Mensal</option>
            <option value="personalizado">Personalizado</option>
          </select>
        </motion.div>

        {subscriptionType === 'personalizado' && (
          <motion.div
            className="form-group"
            initial={{ opacity: 0, translateZ: -50 }}
            animate={{ opacity: 1, translateZ: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-#111827 mb-2">Duração da Assinatura</label>
            <div className="flex gap-4">
              <input
                type="number"
                min={1}
                name="subscriptionDuration"
                value={subscriptionDuration}
                onChange={(e) => setSubscriptionDuration(e.target.value)}
                className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <select
                name="subscriptionDurationUnit"
                value={subscriptionDurationUnit}
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

        {expirationDate && (
          <div className="mt-4 text-sm text-green-500">
            Expira em: {dayjs(expirationDate).format('DD/MM/YYYY [às] HH:mm')}
          </div>
        )}

        {/* Status do cliente */}
        <motion.div
          className="form-group"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <label className="block text-sm font-medium text-#111827 mb-2">Status do Cliente</label>
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
        </motion.div>

        {/* Campos Personalizados */}
        <motion.div
          className="custom-fields"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mt-6 mb-4">Campos Personalizados</h3>
          <div className="form-group flex gap-4 mb-4">
            <input
              type="text"
              name="fieldName"
              placeholder="Nome do campo"
              value={customField.fieldName}
              onChange={handleCustomFieldChange}
              className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="fieldValue"
              placeholder="Valor do campo"
              value={customField.fieldValue}
              onChange={handleCustomFieldChange}
              className="w-1/2 p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <motion.button
              type="button"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 flex items-center gap-2"
              onClick={addCustomField}
              whileHover={{ scale: 1.1 }}
            >
              <Plus size={20} />
              Adicionar Campo
            </motion.button>
          </div>
        </motion.div>

        {/* Botões de submit */}
        <motion.div
          className="form-buttons flex gap-4 mt-8"
          initial={{ opacity: 0, translateZ: -50 }}
          animate={{ opacity: 1, translateZ: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center gap-2"
            disabled={loading}
            whileHover={{ scale: 1.1 }}
          >
            <FloppyDisk size={20} />
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </motion.button>

          <motion.button
            type="button"
            className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105 flex items-center gap-2"
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.1 }}
          >
            <ArrowLeft size={20} />
            Cancelar
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ClientEdit;
