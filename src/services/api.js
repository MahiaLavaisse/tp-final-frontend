import axios from 'axios';

// URL base con fallback garantizado
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Configuración global de Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos máximo por petición
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de solicitud (token)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor de respuesta (manejo global de errores)
api.interceptors.response.use(
  response => response,
  error => {
    // Manejo estructurado de errores
    if (error.response) {
      // Error del servidor (4xx-5xx)
      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data.error || data.message || 'Error desconocido'
      });
    } else if (error.request) {
      // Error de red (no llegó al backend)
      return Promise.reject({
        status: 0,
        message: 'Error de red: No se pudo conectar al servidor'
      });
    } else {
      // Error en la configuración
      return Promise.reject({
        status: -1,
        message: 'Error interno: ' + error.message
      });
    }
  }
);

// Funciones API con manejo mejorado
export const registerUser = async (data) => {
  try {
    const response = await api.post('/api/register', data);
    return response;
  } catch (err) {
    // Captura específica de errores de validación
    if (err.status === 400 && err.message.includes('ValidationError')) {
      throw new Error('Error de validación: ' + err.message);
    }
    throw err;
  }
};

export const loginUser = async (data) => {
  return api.post('/api/login', data);
};

export const getUserProfile = async () => {
  return api.get('/api/me');
};