import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, EnvelopeSimple, Key } from 'phosphor-react';
import api from '../../services/api';

const Register = () => {
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
      // console.log('Dados do formulário:', form);
      const response = await api.post('/api/auth/register', form);
      const { accessToken } = response.data;

      localStorage.setItem('token', accessToken);
      console.log('Token de acesso pós registro:', accessToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao registrar', error);
      setErrors({ server: 'Erro no servidor, tente novamente mais tarde.' });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-900 to-black text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="container max-w-lg w-full p-10 bg-gray-900 rounded-xl shadow-lg transform-gpu"
        initial={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 20, duration: 1 }}
      >
        <motion.h2
          className="text-4xl text-blue-700 font-bold text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Registrar-se
        </motion.h2>
        {errors.server && (
          <motion.span
            className="error-message text-red-500 text-center block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {errors.server}
          </motion.span>
        )}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
        >
          <div className="form-group mb-6 flex items-center">
            <motion.div
              className="mr-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            >
              <User size={32} weight="bold" />
            </motion.div>
            <motion.input
              type="text"
              placeholder="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            />
            {errors.name && (
              <motion.span
                className="text-red-500 text-sm block mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.name}
              </motion.span>
            )}
          </div>
          <div className="form-group mb-6 flex items-center">
            <motion.div
              className="mr-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
            >
              <EnvelopeSimple size={32} weight="bold" />
            </motion.div>
            <motion.input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
            />
            {errors.email && (
              <motion.span
                className="text-red-500 text-sm block mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.email}
              </motion.span>
            )}
          </div>
          <div className="form-group mb-6 flex items-center">
            <motion.div
              className="mr-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 80 }}
            >
              <Key size={32} weight="bold" />
            </motion.div>
            <motion.input
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 80 }}
            />
            {errors.password && (
              <motion.span
                className="text-red-500 text-sm block mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.password}
              </motion.span>
            )}
          </div>
          <div className="form-group mb-6 flex items-center">
            <motion.div
              className="mr-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 80 }}
            >
              <Key size={32} weight="bold" />
            </motion.div>
            <motion.input
              type="password"
              placeholder="Confirmar Senha"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 80 }}
            />
            {errors.confirmPassword && (
              <motion.span
                className="text-red-500 text-sm block mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {errors.confirmPassword}
              </motion.span>
            )}
          </div>
          <div className="form-buttons flex justify-between gap-4 mt-8">
            <motion.button
              type="submit"
              className="btn-register text-white bg-green-600 py-3 px-8 rounded-lg shadow-md transform hover:bg-greeb-700 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1, rotateX: 10 }}
            >
              Registrar
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate('/login')}
              className="btn-back text-white bg-indigo-600 py-3 px-8 rounded-lg shadow-md transform hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1, rotateX: -10 }}
            >
              Voltar
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
