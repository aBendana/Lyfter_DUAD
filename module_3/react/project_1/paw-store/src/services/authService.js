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
 * This centralizes authentication logic, so individual service methods
 * (GET, POST, PATCH, DELETE) do not need to manually include the token.
 * This is because this interceptor is situated in api, (const api = axios.create...)
 * which is used by all service methods.
 *
 * Note: json-server does not validate Bearer tokens, it's ignore the intercpetor,
 * because it is a mock API, However, with this implementation the project is ready
 * to be connected to a real backend that requires authentication, as the interceptor
 * will handle the token automatically.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// authService object to handle authentication-related API calls
export const authService = {
  /* 
  ! IMPORTANT NOTE: this is how the login method should be structured
  ! use a /login endpoint to send the email and password to the server in a post request,
  ! and the server should return a token if the credentials are valid
  ! but because this is a json-server mock API, we will not be able to use it as is 
  */
  // login service method, store token in localStorage if successful
  async login(email, password) {
    try {
      const res = await api.post('/login', { email, password });
      // store the token in localStorage
      localStorage.setItem('token', res.data);
      return res.data;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  /*
  ! NOTE: mock login service method for development purposes,
  ! it don't use a post request instead it use a get request
  ! to the /users endpoint and filter the user by email and password
  ! store token in localStorage if successful
  */
  async mockLogin(email, password) {
    try {
      const res = await api.get('/users');
      const user = res.data.find(
        (u) =>
          (u.email === email || u.username === email) && u.password === password
      );
      if (user) {
        // store all user information
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      console.error(
        'Mock login error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  /* 
    !NOTE: the endpoint should be like /auth-register, /register or /signup 
    ! but because this is a json-server mock API, we will not be able to use it as is
    ! instead we will use the /users endpoint to create a new user
  */
  // register service method, store token in localStorage if successful
  async register(username, email, password, role) {
    try {
      const res = await api.post('/users', {
        username,
        email,
        password,
        role,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error(
        'Register error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  // logout method, remove token from localStorage
  logout() {
    localStorage.removeItem('user');
  },

  // getToken method, retrieve token from localStorage
  getToken() {
    return JSON.parse(localStorage.getItem('user'))?.token;
  },

  // isAuthenticated method, check if token exists in localStorage
  isAuthenticated() {
    return !!this.getToken(); // checks if user is logged in
  },
};
