import axios, { AxiosError } from 'axios';

const baseUrl = 'http://localhost:3001';

export const JSONAxiosInstance = axios.create({
  baseURL: baseUrl,
});

JSONAxiosInstance.interceptors.response.use(
  (response) => response, 
  (error: AxiosError) => {
    if (error.message) {
      return Promise.reject({
        code: error.status, // Código de error genérico
        message: error.message,
      });
    }

    return Promise.reject({
      code: '9999',
      message: 'Error desconocido',
    });
  }
);