import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = '/api';
const AUTH_COOKIE_NAME = 'auth_token';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

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
      Cookies.set(AUTH_COOKIE_NAME, data.token, { expires: 7 });
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

// 🔑 Obtener Datos de Perfil (usando token y ruta /profile)
export const fetchUserProfile = async (token) => {
    if (!token) {
        throw new Error("Token no disponible para cargar el perfil.");
    }
    
    try {
        // Usa el endpoint '/profile'
        const response = await api.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        
        return response.data; 
    } catch (error) {
        // Usa axios.isAxiosError() para manejo de errores
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                throw new Error("Token inválido o expirado. (401)");
            }
            if (error.response.status === 404) {
                throw new Error("Endpoint /api/profile no encontrado (404).");
            }
            throw new Error(error.response.data.message || "Error al obtener perfil."); 
        }

        if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
            throw new Error("Error de conexión con el servidor API.");
        }
        
        throw new Error(error.message || "Error desconocido.");
    }
};


export { api };