import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/login', form);
      // Armazena o token no localStorage (ou cookie HttpOnly, se preferir)
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Redireciona para a área protegida
    } catch (error) {
      setErrors({ server: 'Credenciais inválidas, tente novamente.' });
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
          <button type="button" onClick={() => navigate('/register')} className="btn-back">Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
