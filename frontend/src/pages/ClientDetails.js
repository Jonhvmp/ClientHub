import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado
import '../assets/css/ClientDetails.css'; // Estilização específica para esta página

const ClientDetails = () => {
  const { id } = useParams(); // Captura o ID do cliente da URL
  const [client, setClient] = useState(null); // Armazena os dados do cliente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para buscar os dados do cliente
  const fetchClientData = useCallback(async () => {
    try {
      const response = await api.get(`/api/clients/${id}`);
      setClient(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      setError('Erro ao carregar os dados do cliente. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  // Função para deletar o cliente
  const handleDeleteClient = async () => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/api/clients/${id}`);
        navigate('/clients'); // Redireciona para a lista de clientes após a exclusão
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        setError('Erro ao excluir o cliente. Tente novamente.');
      }
    }
  };

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
