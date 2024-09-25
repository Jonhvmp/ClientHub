// src/services/api.js

import axios from 'axios';

const api = axios.create({ // Crie uma instância do Axios
  baseURL: 'http://localhost:5000',  // Defina a URL base para o backend
});

export default api;
