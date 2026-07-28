import axios from 'axios';

// not a real API URL, is json-server running on localhost:3001
// for development purposes
const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

/*
 * IMPORTANT:
 * This request interceptor runs before every HTTP request.
 * If an authentication token exists in localStorage, it is automatically
 * attached to the Authorization header using the Bearer scheme.
 *
 * This centralizes authentication logic in one shared client so individual
 * service modules do not need to duplicate token handling.
 *
 * Note: json-server does not validate Bearer tokens because it is a mock API.
 * However, keeping this interceptor makes the project ready to connect with a
 * real backend that requires authentication.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
