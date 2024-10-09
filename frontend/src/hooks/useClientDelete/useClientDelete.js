import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Serviço Axios configurado

const useClientDetails = (id) => {
  const [client, setClient] = useState(null); // Armazena os dados do cliente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  // Função para buscar os dados do cliente
  const fetchClientData = useCallback(async () => {
    try {
      setLoading(true);
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
    try {
      setDeleteLoading(true);
      await api.delete(`/api/clients/${id}`);
      setDeleteLoading(false);
      navigate('/clients'); // Redireciona para a lista de clientes após a exclusão
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      setError('Erro ao excluir o cliente. Tente novamente.');
      setDeleteLoading(false);
    }
  };

  return {
    client,
    loading,
    error,
    handleDeleteClient,
    deleteLoading,
  };
};

export default useClientDetails;
