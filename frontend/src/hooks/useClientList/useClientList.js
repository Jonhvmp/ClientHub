import { useState, useCallback, useEffect } from 'react';
import api from '../../services/api'; // Serviço Axios configurado

const useClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5); // Número de clientes por página
  const [totalClients, setTotalClients] = useState(0);

  // Função para buscar clientes e atualizar o estado
  const fetchClients = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/clients?query=${query}&page=${page}&limit=${clientsPerPage}`);
      const data = response.data.data;

      setClients(data);
      setTotalClients(response.data.total); // Total de clientes retornados
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Erro ao carregar os dados dos clientes. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, [query, clientsPerPage]);

  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage, query, fetchClients]);

  const handleDeleteClient = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/api/clients/${id}`);
        fetchClients(currentPage); // Atualiza a lista de clientes após a exclusão
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        setError('Erro ao excluir o cliente. Tente novamente.');
      }
    }
  };

  return {
    clients,
    loading,
    error,
    query,
    setQuery,
    currentPage,
    clientsPerPage,
    totalClients,
    setCurrentPage,
    handleDeleteClient,
  };
};

export default useClientList;
