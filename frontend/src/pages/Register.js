import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!form.name) formErrors.name = 'O nome é obrigatório';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) formErrors.email = 'O email deve ser válido';
    if (form.password.length < 6) formErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    if (form.password !== form.confirmPassword) formErrors.confirmPassword = 'As senhas não correspondem';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await api.post('/api/register', form);
      navigate('/login'); // Redireciona para a página de login após o registro
    } catch (error) {
      console.error('Erro ao registrar', error);
      setErrors({ server: 'Erro no servidor, tente novamente mais tarde.' });
    }
  };

  return (
    <div className="container">
      <h2>Registrar-se</h2>
      {errors.server && <span className="error-message">{errors.server}</span>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-register">Registrar</button>
          <button type="button" onClick={() => navigate('/login')} className="btn-back">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
