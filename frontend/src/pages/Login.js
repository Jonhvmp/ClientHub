import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Usando Axios
import '../assets/css/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Dados de entrada:', form);

    try {
      const response = await api.post('/api/login', form);
      console.log('Resposta da API:', response.data);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um status diferente de 2xx
        console.error('Erro na resposta da API:', error.response.data);
        setErrors(error.response.data);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição que disparou um erro
        console.error('Erro ao configurar a requisição:', error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errors.server && <span className="error-message">{errors.server}</span>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-login">Entrar</button>
          <button type="button" onClick={() => navigate('/register')}>Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
