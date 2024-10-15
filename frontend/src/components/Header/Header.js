import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { List, SignIn, SignOut, UserCircle, PlusCircle, MagnifyingGlass } from 'phosphor-react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulando um carregamento
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header
        className="bg-gray-900 text-white p-4 shadow-md fixed w-full z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              ClientHub
            </motion.div>
          </Link>

          {/* Botão do menu hamburguer para dispositivos menores */}
          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </button>
          </div>

          {/* Navegação para telas grandes */}
          <nav className="hidden lg:flex items-center space-x-4">
            {isLoading ? (
              <>
                <Skeleton
                  sx={{ bgcolor: 'rgb(37 99 235 / var(--tw-text-opacity))' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'rgb(37 99 235 / var(--tw-text-opacity))' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'rgb(37 99 235 / var(--tw-text-opacity))' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'rgb(37 99 235 / var(--tw-text-opacity))' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'white' }}
                  variant="text" width={50} height={24} />
              </>
            ) : isLoggedIn ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-400">
                  <motion.div whileHover={{ x: 5 }}>
                    <List size={24} weight="bold" /> Dashboard
                  </motion.div>
                </Link>
                <Link to="/clients/create" className="hover:text-gray-400">
                  <motion.div whileHover={{ x: 5 }}>
                    <PlusCircle size={24} weight="bold" /> Create Client
                  </motion.div>
                </Link>
                <Link to="/clients/search" className="hover:text-gray-400">
                  <motion.div whileHover={{ x: 5 }}>
                    <MagnifyingGlass size={24} weight="bold" /> Search Client
                  </motion.div>
                </Link>
                <Link to="/profile" className="hover:text-gray-400">
                  <motion.div whileHover={{ x: 5 }}>
                    <UserCircle size={24} weight="bold" /> Profile
                  </motion.div>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center hover:text-gray-400 focus:outline-none"
                >
                  <motion.div whileHover={{ x: 5 }}>
                    <SignOut size={24} weight="bold" /> Logout
                  </motion.div>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-400">
                  <motion.div whileHover={{ x: 5 }}>
                    <SignIn size={24} weight="bold" /> Login
                  </motion.div>
                </Link>
                <Link to="/register" className="hover:text-gray-400">
                  <motion.div whileHover={{ x: 5 }}>
                    <PlusCircle size={24} weight="bold" /> Register
                  </motion.div>
                </Link>
              </>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Menu lateral para dispositivos móveis */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-gray-900 text-white p-6 z-20"
        >
          <nav className="flex flex-col space-y-4">
            {isLoading ? (
              <>
                 <Skeleton
                  sx={{ bgcolor: 'blue' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'blue' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'blue' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'blue' }}
                  variant="text" width={50} height={24} />
                <Skeleton
                  sx={{ bgcolor: 'white' }}
                  variant="text" width={50} height={24} />
              </>
            ) : isLoggedIn ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-400" onClick={toggleMenu}>
                  <List size={24} weight="bold" /> Dashboard
                </Link>
                <Link to="/clients/create" className="hover:text-gray-400" onClick={toggleMenu}>
                  <PlusCircle size={24} weight="bold" /> Create Client
                </Link>
                <Link to="/clients/search" className="hover:text-gray-400" onClick={toggleMenu}>
                  <MagnifyingGlass size={24} weight="bold" /> Search Client
                </Link>
                <Link to="/profile" className="hover:text-gray-400" onClick={toggleMenu}>
                  <UserCircle size={24} weight="bold" /> Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="flex items-center hover:text-gray-400 focus:outline-none"
                >
                  <SignOut size={24} weight="bold" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-400" onClick={toggleMenu}>
                  <SignIn size={24} weight="bold" /> Login
                </Link>
                <Link to="/register" className="hover:text-gray-400" onClick={toggleMenu}>
                  <PlusCircle size={24} weight="bold" /> Register
                </Link>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Header;
