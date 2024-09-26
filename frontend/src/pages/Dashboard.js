import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';  // Supondo que já tenha uma API configurada para chamadas de backend
import '../assets/css/Dashboard.css';  // CSS para o Dashboard

function Dashboard() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  // Função para buscar clientes
  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clientes');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  // Função para logout
  const handleLogout = () => {
    // Aqui você removeria o token JWT e redirecionaria para a página de login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <div className="dashboard-content">
        <h2>Lista de Clientes</h2>
        <Link to="/add-client" className="btn-add-client">Adicionar Cliente</Link>
        <ul className="client-list">
          {clients.length > 0 ? (
            clients.map(client => (
              <li key={client._id} className="client-item">
                <span>{client.name} - {client.email}</span>
                <Link to={`/edit-client/${client._id}`} className="btn-edit-client">Editar</Link>
              </li>
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
