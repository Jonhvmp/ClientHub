import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/css/EditClient.css';

function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subscriptionType: '' });
  const [loading, setLoading] = useState(true); // Adicionar estado de carregamento
  const [error, setError] = useState(null); // Adicionar estado de erro

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/api/clientes/${id}`);
        setForm({
          name: response.data.data.name || '',
          email: response.data.data.email || '',
          phone: response.data.data.phone || '',
          subscriptionType: response.data.data.subscriptionType || ''
        });
        setLoading(false); // Carregamento concluído
      } catch (error) {
        console.error('Erro ao buscar cliente', error);
        setError('Erro ao carregar dados do cliente');
        setLoading(false); // Carregamento concluído
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
      setError('Erro ao atualizar cliente');
    }
  };

  if (loading) return <div>Carregando...</div>; // Mostrar mensagem de carregamento
  if (error) return <div>{error}</div>; // Mostrar erro, se existir

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

        <div className="form-buttons">
          <button type="submit" className="btn-edit-submit">Atualizar Cliente</button>
          <button type="button" onClick={() => navigate('/')} className="btn-back">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default EditClient;
