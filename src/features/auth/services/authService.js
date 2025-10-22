// ../services/authService.js
import axios from 'axios';
import Cookies from 'js-cookie';

// 🔑 CLAVE: Define la URL Base condicionalmente
// Si es desarrollo, usa /api (proxy de Vite).
// Si es producción, usa la variable de entorno completa de Vercel.
const API_BASE_URL = import.meta.env.DEV 
    ? '/api' 
    : import.meta.env.VITE_API_URL; 

if (!API_BASE_URL) {
    console.error("VITE_API_URL no está definido. Revisa tus variables de entorno en Vercel.");
}

const AUTH_COOKIE_NAME = 'auth_token';

// Crea la instancia de Axios con la URL base condicional
const api = axios.create({
  baseURL: API_BASE_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- EL RESTO DE LAS FUNCIONES SE MANTIENE ---

/** 🔹 Registrar Usuario */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/** 🔹 Iniciar Sesión */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const data = response.data;

    if (data.token) {
      // Asegúrate de establecer 'secure: true' y 'sameSite' si estás en un dominio HTTPS (Vercel)
      Cookies.set(AUTH_COOKIE_NAME, data.token, { expires: 7, secure: true, sameSite: 'Lax' });
    }

    return data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/** 🔹 Cerrar Sesión */
export const logoutUser = async () => {
  try {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    await api.delete('/logout', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } finally {
    Cookies.remove(AUTH_COOKIE_NAME);
  }
};

// 🔑 Obtener Datos de Perfil
export const fetchUserProfile = async (token) => {
    if (!token) {
        throw new Error("Token no disponible para cargar el perfil.");
    }
    
    try {
        const response = await api.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || `Error ${error.response.status} al obtener perfil.`); 
        }
        throw new Error(error.message || "Error desconocido.");
    }
};

export { api };