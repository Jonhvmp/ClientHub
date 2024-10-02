import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado
import '../assets/css/ClientCreate.css'; // Arquivo CSS para estilização

const ClientCreate = () => {
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  // Função para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Verifica se os campos obrigatórios estão preenchidos
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Nome, email e telefone são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      // Chamada à API para adicionar um novo cliente
      const response = await api.post('/api/clients', formData);
      console.log('Resposta da API:', response.data);
      navigate('/clients'); // Redirecionar para a lista de clientes após o sucesso
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      setError('Erro ao adicionar cliente. Verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="client-create-container">
      <h1>Adicionar Cliente</h1>

      {error && <div className="error-message">{error}</div>}

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
            {loading ? 'Salvando...' : 'Salvar Cliente'}
          </button>

          <button type="button" className="btn-secondary" onClick={() => navigate('/clients')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientCreate;
