import React, { useEffect, useState } from 'react';
import api from '../services/api';  // Importe o Axios configurado

function Home() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('/api/clients')  // Aqui não precisa incluir /api, pois já está configurado na baseURL
      .then(response => { // Supondo que o backend retorne uma lista de clientes
        setClients(response.data);  // Supondo que o backend retorne uma mensagem
      })
      .catch(error => {
        console.error("Erro ao buscar dados do backend", error);
      });
  }
  , []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clients.map(client => (
          <li key={client._id}>{client.name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
