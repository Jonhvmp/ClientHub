import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço Axios configurado

const useClientEdit = (id) => {
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
    try {
      setLoading(true);
      setError(null);

      const response = await api.put(`/api/clients/${id}`);
      setFormData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      setError('Erro ao carregar os dados do cliente. Tente novamente mais tarde.');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

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
    setLoading(true);
    setUpdateError(null);

    if (!formData.name || !formData.email || !formData.phone) {
      setUpdateError('Nome, email e telefone são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      await api.put(`/api/clients/${id}`, formData);
      navigate('/clients');
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      setUpdateError('Erro ao atualizar cliente. Verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  return {
    formData,
    customField,
    loading,
    error,
    updateError,
    handleInputChange,
    handleAddressChange,
    handleCustomFieldChange,
    addCustomField,
    handleSubmit,
  };
};

export default useClientEdit;
