import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado
import '../assets/css/ClientEdit.css'; // Arquivo CSS para estilização

const ClientEdit = () => {
  const { id } = useParams(); // Captura o ID do cliente da URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    tags: '',
    subscriptionType: 'mensal',
    subscriptionStatus: 'ativo',
    customFields: [],
  });
  const [customField, setCustomField] = useState({ fieldName: '', fieldValue: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  // Função para buscar os dados do cliente ao carregar a página
  const fetchClientData = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get(`/api/clientes/${id}`);
      Headers.set('Authorization', `Bearer ${token}`);
      setFormData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      setError('Erro ao carregar os dados do cliente. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, [id]); // Incluímos 'id' como dependência, já que pode mudar com a rota

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  // Função para lidar com as mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para lidar com mudanças em campos de endereço
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  // Função para lidar com campos personalizados
  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setCustomField({
      ...customField,
      [name]: value,
    });
  };

  // Função para adicionar campos personalizados ao array
  const addCustomField = () => {
    if (customField.fieldName && customField.fieldValue) {
      setFormData({
        ...formData,
        customFields: [...formData.customFields, customField],
      });
      setCustomField({ fieldName: '', fieldValue: '' }); // Limpar campo após adicionar
    }
  };

  // Função para submeter o formulário de edição
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUpdateError(null);

    // Verifica se os campos obrigatórios estão preenchidos
    if (!formData.name || !formData.email || !formData.phone) {
      setUpdateError('Nome, email e telefone são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      // Chamada à API para atualizar os dados do cliente
      await api.put(`/api/clientes/${id}`, formData);
      navigate('/clientes'); // Redirecionar para a lista de clientes após o sucesso
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      setUpdateError('Erro ao atualizar cliente. Verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  // Exibir mensagem de carregamento ou erro ao carregar dados
  if (loading) {
    return <div className="loading">Carregando dados do cliente...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="client-edit-container">
      <h1>Editar Cliente</h1>

      {updateError && <div className="error-message">{updateError}</div>}

      <form onSubmit={handleSubmit}>
        {/* Informações básicas */}
        <div className="form-group">
          <label>Nome*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Informações adicionais */}
        <div className="form-group">
          <label>Empresa</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Tags (separadas por vírgula)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Ex: importante, lead, vip"
          />
        </div>

        {/* Endereço */}
        <div className="address-group">
          <h3>Endereço</h3>
          <div className="form-group">
            <label>Rua</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label>Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label>CEP</label>
            <input
              type="text"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label>País</label>
            <input
              type="text"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        {/* Tipo e status da assinatura */}
        <div className="form-group">
          <label>Tipo de Assinatura</label>
          <select
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={handleInputChange}
          >
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
            <option value="semestral">Semestral</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status da Assinatura</label>
          <select
            name="subscriptionStatus"
            value={formData.subscriptionStatus}
            onChange={handleInputChange}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="pendente">Pendente</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        {/* Campos Personalizados */}
        <div className="custom-fields">
          <h3>Campos Personalizados</h3>
          <div className="form-group">
            <input
              type="text"
              name="fieldName"
              placeholder="Nome do campo"
              value={customField.fieldName}
              onChange={handleCustomFieldChange}
            />
            <input
              type="text"
              name="fieldValue"
              placeholder="Valor do campo"
              value={customField.fieldValue}
              onChange={handleCustomFieldChange}
            />
            <button type="button" className="btn-add-custom-field" onClick={addCustomField}>
              Adicionar Campo
            </button>
          </div>

          {formData.customFields.length > 0 && (
            <div className="custom-fields-list">
              <h4>Campos Personalizados Adicionados:</h4>
              <ul>
                {formData.customFields.map((field, index) => (
                  <li key={index}>
                    <strong>{field.fieldName}:</strong> {field.fieldValue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botão de submit */}
        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientEdit;
