import { useState, useEffect } from 'react';
import api from '../services/api';

const useDashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    activeClients: 0,
    inactiveClients: 0,
    pendingClients: 0,
    totalClients: 0,
    lastAdded: null,
  });

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado, faça login novamente.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get('/api/clients', config);
      const { data } = response.data;

      if (!Array.isArray(data)) {
        throw new Error('Os dados retornados não são um array.');
      }

      setClients(data);

      const activeClients = data.filter(client => client.status === 'ativo').length;
      const inactiveClients = data.filter(client => client.status === 'inativo').length;
      const pendingClients = data.filter(client => client.status === 'pendente').length;
      const lastAdded = data.length > 0 ? data[data.length - 1].name : 'Nenhum cliente';

      setMetrics({
        activeClients,
        inactiveClients,
        pendingClients,
        totalClients: data.length,
        lastAdded,
      });

      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar os dados dos clientes. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, loading, error, metrics, fetchClients };
};

export default useDashboard;

