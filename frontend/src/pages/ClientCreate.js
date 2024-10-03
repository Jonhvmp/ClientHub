import React from 'react';
import useClientCreate from '../hooks/useClientCreate';
import '../assets/css/ClientCreate.css'; // Arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';

const ClientCreate = () => {
  const navigate = useNavigate();
  const {
    formData,
    customField,
    error,
    loading,
    handleInputChange,
    handleAddressChange,
    handleCustomFieldChange,
    addCustomField,
    handleSubmit,
  } = useClientCreate();

  return (
    <div className="client-create-container">
      <h1>Adicionar Cliente</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
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
