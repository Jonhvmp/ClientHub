import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/ClientList.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5); // Número de clientes por página
  const [totalClients, setTotalClients] = useState(0);

  const navigate = useNavigate();

  // Função para buscar clientes e atualizar o estado
  const fetchClients = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/clientes?query=${query}&page=${page}&limit=${clientsPerPage}`);
      const data = response.data.data;

      setClients(data);
      setTotalClients(response.data.total); // Total de clientes retornados
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Erro ao carregar os dados dos clientes. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, [query, clientsPerPage]); // Adicionar dependências corretamente

  // useEffect para buscar clientes ao carregar a página ou quando o query/página muda
  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage, query, fetchClients]);

  // Outras funções continuam as mesmas...
  const handleAddClient = () => {
    navigate('/clientes/novo');
  };

  const handleEditClient = (id) => {
    navigate(`/clientes/${id}/editar`);
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/api/clientes/${id}`);
        fetchClients(currentPage); // Atualiza a lista de clientes após a exclusão
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        setError('Erro ao excluir o cliente. Tente novamente.');
      }
    }
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="client-list-container">
      <h1>Clientes</h1>

      <div className="actions">
        <button className="btn-primary" onClick={handleAddClient}>
          Adicionar Cliente
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {clients.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <>
          <table className="clients-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.subscriptionStatus}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditClient(client._id)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteClient(client._id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            clientsPerPage={clientsPerPage}
            totalClients={totalClients}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

// Componente de Paginação
const Pagination = ({ clientsPerPage, totalClients, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalClients / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
