import axios, { AxiosError } from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
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