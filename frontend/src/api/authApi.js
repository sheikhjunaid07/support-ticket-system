import api from './axiosClient';

// Login API request
export const loginRequest = (credentials) =>
  api.post('/auth/login', credentials).then((response) => response.data);
