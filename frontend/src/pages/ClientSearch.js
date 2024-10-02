import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado
import '../assets/css/ClientSearch.css'; // Estilização específica para esta página

const ClientSearch = () => {
  const [query, setQuery] = useState(''); // Armazena a string de busca
  const [clients, setClients] = useState([]); // Armazena os clientes encontrados
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const navigate = useNavigate(); // Para navegação

  // Função para buscar clientes de acordo com a query
  const fetchClients = useCallback(async () => {
    if (!query) return; // Não busca se a query estiver vazia

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/clients/search?query=${query}`);
      setClients(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Erro ao buscar clientes. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, [query]);

  // Busca os clientes sempre que a query mudar
  useEffect(() => {
    if (query.trim() !== '') {
      fetchClients();
    }
  }, [query, fetchClients]);

  // Função para lidar com a mudança no campo de busca
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Função para exibir o resultado de busca
  const renderClients = () => {
    if (loading) {
      return <div className="loading">Buscando clientes...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (clients.length === 0 && query.trim() !== '') {
      return <div className="no-results">Nenhum cliente encontrado.</div>;
    }

    return (
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client._id}>
            <h3>{client.name}</h3>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Tags:</strong> {client.tags || 'Nenhuma'}</p>
            <div className="client-actions">
              <button className="btn-view" onClick={() => navigate(`/clients/${client._id}`)}>
                Ver Detalhes
              </button>
              <button className="btn-edit" onClick={() => navigate(`/clients/${client._id}/edit`)}>
                Editar Cliente
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="client-search-container">
      <h1>Buscar Clientes</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome, email ou tags"
          value={query}
          onChange={handleSearchChange}
        />
      </div>

      {/* Renderização dos resultados ou estado de busca */}
      {renderClients()}
    </div>
  );
};

export default ClientSearch;
