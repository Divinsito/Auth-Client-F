import { useState, useEffect, useCallback } from 'react';
// 🚨 ELIMINADO getProfile
import { logout as apiLogout } from '../services/authService';
import Cookies from 'js-cookie'; 

// Usaremos el nombre de tu cookie de autenticación/sesión
const AUTH_COOKIE_NAME = 'csrftoken'; 

export const useAuth = () => {
  // 🚨 ELIMINADO: user, ya que no cargamos el perfil
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------------------------------------------------
  // 🔹 Función de Verificación de Sesión (Solo verifica la existencia de la cookie)
  // ------------------------------------------------------------------
  const checkSession = useCallback(() => {
    setIsLoading(true);
    
    // 1. Verificar si existe la cookie
    if (Cookies.get(AUTH_COOKIE_NAME)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  // ------------------------------------------------------------------
  // 🔹 Función para Cerrar Sesión
  // ------------------------------------------------------------------
  const handleLogout = async () => {
    try {
      await apiLogout(); // Llama al endpoint DELETE /logout
      
    } catch (error) {
      console.error('Error al cerrar sesión, forzando limpieza local:', error);
    } finally {
      // Limpiamos el estado y la cookie local
      setIsAuthenticated(false);
      Cookies.remove(AUTH_COOKIE_NAME);
    }
  };

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return { 
    // 🚨 user ha sido ELIMINADO de la exportación
    isAuthenticated, 
    isLoading,
    handleLogout, // Función para cerrar sesión
    checkSession // Añadimos esto para que se pueda llamar después del login
  };
};