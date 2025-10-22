// ../services/authService.js
import axios from 'axios';
import Cookies from 'js-cookie';

// 🔑 CLAVE: Forzamos la URL base a '/api'.
// Esto hace que el navegador apunte al mismo origen, y el archivo vercel.json 
// actúa como un proxy inverso para redirigir al backend real.
const API_BASE_URL = '/api'; 

const AUTH_COOKIE_NAME = 'auth_token';

// Crea la instancia de Axios.
// Mantener withCredentials: true es CRÍTICO para las cookies.
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
    // Asegurarse de manejar errores correctamente
    throw error.response ? error.response.data : error;
  }
};

/** 🔹 Iniciar Sesión */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const data = response.data;

    if (data.token) {
      // ✅ MEJORA DE SEGURIDAD: 
      // secure: true (solo se envía en HTTPS, Vercel es HTTPS).
      // sameSite: 'Lax' (recomendado para JWT en cookies).
      Cookies.set(AUTH_COOKIE_NAME, data.token, { expires: 7, secure: true, sameSite: 'Lax' });
    }

    return data;
  } catch (error) {
    // Asegurarse de que el error.response sea lo que se lanza para el componente Login
    throw error.response ? error.response.data : error;
  }
};

/** 🔹 Cerrar Sesión */
export const logoutUser = async () => {
  try {
    // La API de logout puede requerir o no el token en el header, pero el proxy ya permite 
    // que las cookies se envíen automáticamente con withCredentials: true.
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
        // Aunque withCredentials: true envía las cookies, el header de Autorización 
        // es el método más estándar para enviar JWT.
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