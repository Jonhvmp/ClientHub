import React from 'react';
import { useParams } from 'react-router-dom';
import useClientDelete from '../hooks/useClientDelete';
import '../assets/css/ClientDelete.css'; // Estilização específica para esta página
import { useNavigate } from 'react-router-dom';

const ClientDelete = () => {
  const { id } = useParams(); // Captura o ID do cliente da URL
  const navigate = useNavigate();
  const {
    client,
    loading,
    error,
    deleteError,
    deleting,
    handleDeleteClient,
  } = useClientDelete(id);

  // Exibir carregamento ou erro ao carregar dados
  if (loading) {
    return <div className="loading">Carregando detalhes do cliente...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="client-delete-container">
      <h1>Excluir Cliente</h1>

      {client ? (
        <>
          <div className="confirmation-message">
            <h2>Tem certeza que deseja excluir o cliente?</h2>
            <p><strong>Nome:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Telefone:</strong> {client.phone}</p>
          </div>

          {/* Mensagem de erro de exclusão */}
          {deleteError && <div className="error-message">{deleteError}</div>}

          <div className="actions">
            <button className="btn-delete" onClick={handleDeleteClient} disabled={deleting}>
              {deleting ? 'Excluindo...' : 'Confirmar Exclusão'}
            </button>
            <button className="btn-cancel" onClick={() => navigate('/clients')}>
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <p>Cliente não encontrado.</p>
      )}
    </div>
  );
};

export default ClientDelete;
