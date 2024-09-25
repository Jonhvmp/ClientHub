import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/AddClient.css';

function AddClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subscriptionType: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/clientes', form);
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar cliente', error);
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />
        <select
          value={form.subscriptionType}
          onChange={e => setForm({ ...form, subscriptionType: e.target.value })}
          required
        >
          <option value="">Escolha o tipo de assinatura</option>
          <option value="mensal">Mensal</option>
          <option value="trimestral">Trimestral</option>
          <option value="semestral">Semestral</option>
          <option value="anual">Anual</option>
        </select>
        <button type="submit" class="btn-add-client">Adicionar Cliente</button>

        {/* Button voltar */}
        <button onClick={() => navigate('/')} className="btn-back">Voltar</button>
      </form>
    </div>
  );
}

export default AddClient;
