import React from 'react';
import { useNavigate } from 'react-router-dom';
import useClientSearch from '../hooks/useClientSearch/useClientSearch';
import '../assets/css/ClientSearch/ClientSearch.css'; // Estilização específica para esta página

const ClientSearch = () => {
  const { query, clients, loading, error, handleSearchChange } = useClientSearch();
  const navigate = useNavigate();

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
          {client._id && (
            <>
              <button className="btn-view" onClick={() => navigate(`/clients/${client._id}/details`)}>
                Ver Detalhes
              </button>
              <button className="btn-edit" onClick={() => navigate(`/clients/${client._id}/edit`)}>
                Editar Cliente
              </button>
            </>
          )}
        </div>
      </li>
    ))}
      </ul>
    );
  }

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
