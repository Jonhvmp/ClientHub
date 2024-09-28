import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';
import '../services/api'; // Importar a instância personalizada do Axios

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: form.email, password: form.password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login efetuado com sucesso!', data);
        // Redirecionar para outra página ou realizar outras ações
      } else {
        setErrors({ server: data.message || 'Erro ao efetuar login' });
      }
    } catch (error) {
      setErrors({ server: 'Erro no servidor' });
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
