import React from 'react';
import { useNavigate } from 'react-router-dom';
import useClientList from '../hooks/useClientList';
import '../assets/css/ClientList.css';

const ClientList = () => {
  const {
    clients,
    loading,
    error,
    // query,
    // setQuery,
    currentPage,
    clientsPerPage,
    totalClients,
    setCurrentPage,
    handleDeleteClient,
  } = useClientList();
  const navigate = useNavigate();

  const handleAddClient = () => {
    navigate('/clients/create');
  };

  const handleEditClient = (id) => {
    navigate(`/clients/${id}/edit`);
  };

  // const handleSearch = (event) => {
  //   setQuery(event.target.value);
  // };

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
        <button className="btn-secondary" onClick={() => navigate('/clients/search')}>
        Pesquisar Clientes
        </button>
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
          Voltar ao Dashboard
        </button>
      </div>

      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div> */}

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
              {clients.map((client) => (
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
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
