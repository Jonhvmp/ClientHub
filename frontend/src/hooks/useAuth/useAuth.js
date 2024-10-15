import { useState } from 'react';

export const useAuth = () => {
  // Obtém o token armazenado no armazenamento local
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // Define o estado de autenticação inicial
  const [auth, setAuth] = useState({
    isLoggedIn: !!token,
    token,
  });

  // Define a função de login
  const login = (token, remember) => {
    // Armazena o token no armazenamento local ou de sessão
    if (remember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }

    // Atualiza o estado de autenticação
    setAuth({
      isLoggedIn: true,
      token,
    });
  };

  // Define a função de logout
  const logout = () => {
    // Remove o token do armazenamento local
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Redireciona para a página de login
    window.location.href = '/login';
  };

  // Retorna o estado de autenticação e as funções de login e logout
  return { ...auth, login, logout };
}
