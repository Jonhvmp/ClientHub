import React, { useEffect, useState } from 'react';
import api from '../services/api';  // Supondo que você tenha configurado o axios

function Home() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Verifique se o caminho da API está correto
    api.get('/clientes')  // Altere para '/clientes' se o backend estiver esperando essa rota
      .then(response => {
        setClients(response.data);  // Assumindo que os dados dos clientes estão na resposta
      })
      .catch(error => {
        console.error("Erro ao buscar dados do backend", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clients.map(client => (
          <li key={client._id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
