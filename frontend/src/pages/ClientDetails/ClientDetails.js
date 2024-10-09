// Arquivo: ClientDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useClientDetails from '../../hooks/useClientDetails/useClientDetails';
import SubscriptionFields from '../../components/SubscriptionFields/SubscriptionFields';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import ClientInfo from '../../components/ClientInfo/ClientInfo';
import ClientAddress from '../../components/ClientAddress/ClientAddress';
import ClientCustomFields from '../../components/ClientCustomFields/ClientCustomFields';
import ClientDocuments from '../../components/ClientDocuments/ClientDocuments';
import '../../assets/css/ClientDetails/ClientDetails.css'; // Estilização específica para esta página

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Captura o ID do cliente da URL
  const { client, loading, error, handleDeleteClient } = useClientDetails(id);

  // Exibir carregamento ou erro
  if (loading) {
    return <div className="loading">Carregando detalhes do cliente...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <motion.div
      className="client-details-container p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-bold mb-8 text-center">Detalhes do Cliente</h1>

      {client ? (
        <>
          <ClientInfo client={client} />

          {/* Informações de Assinatura */}
          <h3 className="text-2xl font-semibold mt-6 mb-2">Assinatura</h3>
          <SubscriptionFields formData={client} handleInputChange={() => {}} />

          {/* Endereço */}
          <ClientAddress address={client.address} />

          {/* Campos Personalizados */}
          <ClientCustomFields customFields={client.customFields} />

          {/* Documentos Relacionados */}
          <ClientDocuments documents={client.documents} />

          {/* Ações de Edição e Exclusão */}
        <div className="flex gap-4 mb-8">
          <motion.button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate(`/clients/${id}/edit`)}
          >
            Adicionar Cliente
          </motion.button>
            <ConfirmDelete handleDelete={handleDeleteClient} itemName={client.name} />
          </div>
        </>
      ) : (
        <p>Cliente não encontrado.</p>
      )}
    </motion.div>
  );
};

export default ClientDetails;
