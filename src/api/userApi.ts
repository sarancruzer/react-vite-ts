import { User } from '../pages/UserList';
import api from './axiosConfig';

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (userData: { username: string; password: string; confirmPassword: string }) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/api/users');
  return response.data;
};
