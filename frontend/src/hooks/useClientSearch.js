import { useState, useCallback, useEffect } from 'react';
import api from '../services/api'; // Serviço Axios configurado

const useClientSearch = () => {
  const [query, setQuery] = useState(''); // Armazena a string de busca
  const [clients, setClients] = useState([]); // Armazena os clientes encontrados
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Função de debounce para realizar a busca após o usuário parar de digitar por 1.5s
  const debounceFetchClients = useCallback(() => {
    const handler = setTimeout(async () => {
      if (query.trim() === '') {
        setClients([]); // Limpa a lista de clientes se o campo de busca estiver vazio
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        };

      const response = await api.get(`/api/clients/search?query=${query}`, config);
        setClients(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setError('Erro ao buscar clientes. Tente novamente mais tarde.');
        setLoading(false);
      }
    }, 1500); // Espera de 1.5 segundos após o usuário parar de digitar

    return handler;
  }, [query]);

  useEffect(() => {
    const handler = debounceFetchClients();
    return () => clearTimeout(handler); // Limpa o timeout anterior ao sair do efeito ou se o query mudar
  }, [debounceFetchClients]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return {
    query,
    clients,
    loading,
    error,
    handleSearchChange,
  };
};

export default useClientSearch;
