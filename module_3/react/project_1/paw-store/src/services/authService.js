import api from './api';

// authService object to handle authentication-related API calls
export const authService = {
  /*
  ! NOTE: mock login service method for development purposes,
  ! it don't use a POST request instead it uses a GET request
  ! to the /users endpoint and filter the user by email and password
  ! a real login method should use endpoint like /auth-login, /login or /signin
  ! if the credentials are valid, this token should be stored for example in 
  ! localStorage or cookies, and used for subsequent requests to the server
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

  // logout method, remove user from localStorage
  logout() {
    localStorage.removeItem('user');
  },
};
