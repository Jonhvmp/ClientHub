import React from 'react';
import { useParams } from 'react-router-dom';
import useClientDetails from '../hooks/useClientDetails/useClientDetails';
import '../assets/css/ClientDetails/ClientDetails.css'; // Estilização específica para esta página
import { useNavigate } from 'react-router-dom';

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
    <div className="client-details-container">
      <h1>Detalhes do Cliente</h1>

      {client ? (
        <>
          <div className="client-info">
            <h2>{client.name}</h2>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Telefone:</strong> {client.phone}</p>
            <p><strong>Empresa:</strong> {client.company || 'Não especificado'}</p>
            <p><strong>Tags:</strong> {client.tags || 'Nenhuma'}</p>

            {/* Informações de Assinatura */}
            <h3>Assinatura</h3>
            <p><strong>Tipo:</strong> {client.subscriptionType}</p>
            <p><strong>Status:</strong> {client.subscriptionStatus}</p>

            {/* Endereço */}
            <h3>Endereço</h3>
            <p>{client.address.street}, {client.address.city}</p>
            <p>{client.address.state}, {client.address.zipCode}</p>
            <p>{client.address.country}</p>

            {/* Campos Personalizados */}
            <h3>Campos Personalizados</h3>
            {client.customFields.length > 0 ? (
              <ul>
                {client.customFields.map((field, index) => (
                  <li key={index}>
                    <strong>{field.fieldName}:</strong> {field.fieldValue}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum campo personalizado adicionado.</p>
            )}

            {/* Documentos Relacionados */}
            <h3>Documentos Relacionados</h3>
            {client.documents && client.documents.length > 0 ? (
              <ul>
                {client.documents.map((doc, index) => (
                  <li key={index}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum documento relacionado.</p>
            )}

            {/* Ações de Edição e Exclusão */}
            <div className="actions">
              <button className="btn-edit" onClick={() => navigate(`/clients/${id}/edit`)}>
                Editar Cliente
              </button>
              <button className="btn-delete" onClick={handleDeleteClient}>
                Excluir Cliente
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Cliente não encontrado.</p>
      )}
    </div>
  );
};

export default ClientDetails;
