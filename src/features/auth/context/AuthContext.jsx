import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { 
  registerUser as registerApi, 
  loginUser as loginApi, 
  logoutUser as logoutApi,
  fetchUserProfile as fetchProfileApi 
} from '../services/authService';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AUTH_COOKIE_NAME = 'auth_token';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // 🔑 LÓGICA DE CHEQUEO DE SESIÓN PERSISTENTE: Lee cookie y carga perfil
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = Cookies.get(AUTH_COOKIE_NAME);
      
      if (storedToken) {
        setToken(storedToken); 
        setIsAuthenticated(true); 
        
        try {
          // Intenta cargar los datos del perfil
          const profileData = await fetchProfileApi(storedToken);
          setUser(profileData);
        } catch (err) {
          console.error("Error al cargar perfil completo. Forzando logout:", err.message); 
          logout(); 
        }
      }
      setLoading(false); 
    };

    checkAuthStatus();
  }, []);

  /** 🔹 Login */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi(credentials);
      
      const newToken = data.token || Cookies.get(AUTH_COOKIE_NAME);
      setToken(newToken);
      setIsAuthenticated(true);
      
      // Cargar los datos completos inmediatamente después del login
      if (newToken) {
         const profileData = await fetchProfileApi(newToken);
         setUser(profileData);
      }
      
      return data;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Logout */
  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn('Error al cerrar sesión en el servidor:', err);
    } finally {
      Cookies.remove(AUTH_COOKIE_NAME); 
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    error,
    token, 
    login,
    logout,
    register: registerApi,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};