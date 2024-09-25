import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/EditClient.css';

function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subscriptionType: '' });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/api/clientes/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error('Erro ao buscar cliente', error);
      }
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/clientes/${id}`, form);
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar cliente', error);
    }
  };

  return (
    <div className="container">
      <h2>Editar Cliente</h2>
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
        <button type="submit">Atualizar Cliente</button>

        {/* Button voltar */}
        <button onClick={() => navigate('/')} className="btn-back">Voltar</button>
      </form>
    </div>
  );
}

export default EditClient;
