// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Usamos un modal o un mensaje para notificar, no 'alert()'
    }
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-extrabold tracking-wider transition hover:text-indigo-400">
          AUTH APP
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-indigo-400 transition">
                Perfil
              </Link>
              <span className="text-indigo-400 font-medium hidden sm:block">
                {user?.user_name || 'Usuario Autenticado'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition duration-200"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition">
                Login
              </Link>
              <Link to="/register" className="text-indigo-400 hover:text-white transition font-medium border border-indigo-400 px-3 py-1 rounded-md">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
