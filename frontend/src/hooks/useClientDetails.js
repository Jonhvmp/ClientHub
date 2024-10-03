import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado

const useClientDetails = (id) => {
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

  return {
    client,
    loading,
    error,
    handleDeleteClient,
  };
};

export default useClientDetails;
