import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Usando Axios
import '../../assets/css/Login/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Dados de entrada:', form);

    try {
      const response = await api.post('/api/auth/login', form);
      console.log('Resposta da API:', response.data);

      const { token } = response.data;

      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('token', token);

      // Redirecionar para o dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas');

      // Exibir mensagem de erro
      setErrors({ server: 'Credenciais inválidas' });
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
          <button type="button" onClick={() => navigate('/register')} className='btn-back'>Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
