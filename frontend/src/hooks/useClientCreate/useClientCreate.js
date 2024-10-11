import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Serviço Axios configurado

const useClientCreate = () => {
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
    subscriptionDuration: 1, // Valor padrão (em meses)
    subscriptionDurationUnit: 'meses',
    customFields: [],
  });

  const [customField, setCustomField] = useState({ fieldName: '', fieldValue: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setCustomField({
      ...customField,
      [name]: value,
    });
  };

  const addCustomField = () => {
    if (customField.fieldName && customField.fieldValue) {
      setFormData({
        ...formData,
        customFields: [...formData.customFields, customField],
      });
      setCustomField({ fieldName: '', fieldValue: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) {
      formData.status = 'ativo'; // Define um valor padrão se necessário
    }
    setLoading(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Nome, email e telefone são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/clients', formData);
      console.log('Resposta da API:', response.data);
      navigate('/clients');
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      setError('Erro ao adicionar cliente. Verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  const calculateExpirationDate = (startDate, duration, unit) => {
    const endDate = new Date(startDate);
    switch (unit) {
      case 'dias':
        endDate.setDate(endDate.getDate() + duration);
        break;
      case 'semanas':
        endDate.setDate(endDate.getDate() + duration * 7);
        break;
      case 'meses':
        endDate.setMonth(endDate.getMonth() + duration);
        break;
      case 'anos':
        endDate.setFullYear(endDate.getFullYear() + duration);
        break;
      default:
        break;
    }
    return endDate;
  };

  // Funções para atualizar os valores de assinatura
  const setSubscriptionType = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      subscriptionType: value,
    }));
  };

  const setSubscriptionDuration = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      subscriptionDuration: value,
    }));
  };

  const setSubscriptionDurationUnit = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      subscriptionDurationUnit: value,
    }));
  };

  return {
    formData,
    customField,
    error,
    loading,
    handleInputChange,
    handleAddressChange,
    handleCustomFieldChange,
    addCustomField,
    handleSubmit,
    calculateExpirationDate,
    setSubscriptionType,
    setSubscriptionDuration,
    setSubscriptionDurationUnit,
  };
};

export default useClientCreate;
