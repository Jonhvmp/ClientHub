import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado
import '../assets/css/ClientDelete.css'; // Estilização específica para esta página

const ClientDelete = () => {
  const { id } = useParams(); // Captura o ID do cliente da URL
  const [client, setClient] = useState(null); // Armazena os dados do cliente
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [deleteError, setDeleteError] = useState(null); // Erro específico ao excluir cliente
  const [deleting, setDeleting] = useState(false); // Estado para controlar a exclusão
  const navigate = useNavigate(); // Para navegação

  // Função para buscar os dados do cliente
  const fetchClientData = useCallback(async () => {
    try {
      const response = await api.get(`/api/clientes/${id}`);
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
    setDeleting(true);
    setDeleteError(null);

    try {
      await api.delete(`/api/clientes/${id}`);
      navigate('/clientes'); // Redireciona para a lista de clientes após a exclusão
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      setDeleteError('Erro ao excluir o cliente. Tente novamente mais tarde.');
      setDeleting(false);
    }
  };

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
            <button className="btn-cancel" onClick={() => navigate('/clientes')}>
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
