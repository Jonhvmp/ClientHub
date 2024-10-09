import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Serviço Axios configurado
import '../../assets/css/UserProfile/UserProfile.css'; // Estilização específica para esta página

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Buscar os dados do usuário ao carregar a página
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/user/profile');
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar dados do perfil:', err);
        setError('Erro ao carregar seus dados. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Função para lidar com a mudança de senha
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Função para confirmar a senha
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Função para lidar com a mudança da foto de perfil
  const handleProfilePictureChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  // Função para atualizar o perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    // Validação de senha
    if (password && password !== confirmPassword) {
      setError('As senhas não correspondem.');
      setUpdating(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);

      if (password) {
        formData.append('password', password);
      }

      if (profilePictureFile) {
        formData.append('profilePicture', profilePictureFile);
      }

      // Enviar dados para a API
      await api.put('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Perfil atualizado com sucesso!');
      setUpdating(false);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError('Erro ao atualizar seu perfil. Tente novamente.');
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando seus dados...</div>;
  }

  if (error && !updating) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <h1>Meu Perfil</h1>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Nome */}
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Foto de Perfil */}
        <div className="form-group">
          <label>Foto de Perfil</label>
          <div className="profile-picture-preview">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Foto de Perfil" />
            ) : (
              <p>Sem foto</p>
            )}
          </div>
          <input type="file" onChange={handleProfilePictureChange} />
        </div>

        {/* Senha */}
        <div className="form-group">
          <label>Nova Senha</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Deixe vazio para manter a senha atual"
          />
        </div>

        {/* Confirmar Senha */}
        <div className="form-group">
          <label>Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirme a nova senha"
          />
        </div>

        {/* Botões */}
        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={updating}>
            {updating ? 'Atualizando...' : 'Atualizar Perfil'}
          </button>

          {/* Botão de Cancelar */}
          <button type="button" className="btn-secondary">
            Cancelar Atualização do Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
