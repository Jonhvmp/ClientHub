import React, { useEffect, useState } from 'react';
import api from './services/api';  // Importe o Axios configurado

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // Fazer uma requisição GET para o backend
    api.get('/api/message')
      .then(response => {
        setData(response.data.message);  // Supondo que o backend retorne uma mensagem
      })
      .catch(error => {
        console.error("Erro ao buscar dados do backend", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Dados do backend:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
