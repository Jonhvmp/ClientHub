import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EnvelopeSimple, Key } from 'phosphor-react';
import api from '../../services/api'; // Usando Axios

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log('Dados de entrada:', form);

    try {
      const response = await api.post('/api/auth/login', form);
      console.log('Resposta da API:', response.data);

      const { token } = response.data;

      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('token', token);

      // Redirecionar para o dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas');

      // Exibir mensagem de erro
      setErrors({ server: 'Credenciais inválidas' });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-900 to-black text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="container max-w-lg w-full p-10 bg-gray-900 rounded-xl shadow-lg transform-gpu"
        initial={{ rotateY: 90 }}
        animate={{ rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 20, duration: 1 }}
      >
        <motion.h2
          className="text-4xl text-blue-700 font-bold text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Login
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
              <EnvelopeSimple size={32} weight="bold" />
            </motion.div>
            <motion.input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            />
          </div>
          <div className="form-group mb-6 flex items-center">
            <motion.div
              className="mr-3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
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
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
            />
          </div>
          <div className="form-buttons flex justify-between gap-4 mt-8">
            <motion.button
              type="submit"
              className="btn-login text-white bg-green-600 py-3 px-8 rounded-lg shadow-md transform hover:bg-green-700 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1, rotateY: 10 }}
            >
              Entrar
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate('/register')}
              className="btn-back text-white bg-indigo-600 py-3 px-8 rounded-lg shadow-md transform hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.1, rotateY: -10 }}
            >
              Registrar
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
