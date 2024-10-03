import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado

const useClientDelete = (id) => {
  const [client, setClient] = useState(null); // Armazena os dados do cliente
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [deleteError, setDeleteError] = useState(null); // Erro específico ao excluir cliente
  const [deleting, setDeleting] = useState(false); // Estado para controlar a exclusão
  const navigate = useNavigate(); // Para navegação

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
    setDeleting(true);
    setDeleteError(null);

    try {
      await api.delete(`/api/clients/${id}`);
      navigate('/clients'); // Redireciona para a lista de clientes após a exclusão
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      setDeleteError('Erro ao excluir o cliente. Tente novamente mais tarde.');
      setDeleting(false);
    }
  };

  return {
    client,
    loading,
    error,
    deleteError,
    deleting,
    handleDeleteClient,
  };
};

export default useClientDelete;
