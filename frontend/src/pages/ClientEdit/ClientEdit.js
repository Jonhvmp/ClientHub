import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useClientEdit from '../../hooks/useClientEdit/useClientEdit';
import '../../assets/css/ClientEdit/ClientEdit.css'; // Arquivo CSS para estilização

const ClientEdit = () => {
  const { id } = useParams(); // Captura o ID do cliente da URL
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
  } = useClientEdit(id);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white text-3xl">Carregando dados do cliente...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-4">{error}</div>;
  }

  return (
    <motion.div
      className="client-edit-container bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-8 flex flex-col items-center justify-center"
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações básicas */}
        <motion.div
          className="form-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-#111928 mb-2">Nome*</label>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-#111928 mb-2">Email*</label>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-#111928 mb-2">Telefone*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Informações adicionais */}
        <motion.div
          className="form-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-#111928 mb-2">Empresa</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-#111928 mb-2">Tags (separadas por vírgula)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Ex: importante, lead, vip"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Endereço */}
        <motion.div
          className="address-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-semibold mt-6 mb-4 text-black">Endereço</h3>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-111928 mb-2">Rua</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-111928 mb-2">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-111928 mb-2">Estado</label>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-111928 mb-2">CEP</label>
            <input
              type="text"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-111928 mb-2">País</label>
            <input
              type="text"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </motion.div>

        {/* Tipo e status da assinatura */}
        <motion.div
          className="form-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-111928 mb-2">Tipo de Assinatura</label>
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
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <label className="block text-sm font-medium text-111928 mb-2">Status da Assinatura</label>
          <select
            name="subscriptionStatus"
            value={formData.subscriptionStatus}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
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
            <button
              type="button"
              className="btn-add-custom-field bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
              onClick={addCustomField}
            >
              Adicionar Campo
            </button>
          </div>

          {formData.customFields.length > 0 && (
            <div className="custom-fields-list">
              <h4 className="text-xl font-semibold mb-4">Campos Personalizados Adicionados:</h4>
              <ul className="list-disc ml-6">
                {formData.customFields.map((field, index) => (
                  <li key={index} className="mb-1">
                    <strong>{field.fieldName}:</strong> {field.fieldValue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Botões de submit */}
        <motion.div
          className="form-buttons flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          <button
            type="button"
            className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
            onClick={() => window.history.back()}
          >
            Cancelar
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ClientEdit;
