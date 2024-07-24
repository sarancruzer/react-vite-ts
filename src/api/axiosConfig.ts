import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com', 
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    console.log('🚀 ~ file: axiosConfig.ts:23 ~ error:', error)
    if (error.response?.status === 401) {
    console.log('🚀 ~ file: axiosConfig.ts:24 ~ error:', error)
    }
    return Promise.reject(error);
  }
);

export default api;
