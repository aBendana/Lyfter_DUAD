import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // state to manage the logged-in user
  const [loggedUser, setLoggedUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  // login method to authenticate the user and store the user data in state
  // and localStorage
  const login = async (email, password) => {
    const user = await authService.mockLogin(email, password);

    setLoggedUser(user);

    return user;
  };

  // Register method to register a new user
  // and store the user data in state
  const register = async (username, email, password, role) => {
    const user = await authService.register(username, email, password, role);

    setLoggedUser(user);

    return user;
  };

  // logout method to clear the user data from state and localStorage
  const logout = () => {
    authService.logout();
    setLoggedUser(null);
  };

  // return the AuthContext provider with the loggedUser, login
  //  and logout methods. isAuthenticated is a boolean indicating
  // if the user is logged in or not
  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        login,
        register,
        logout,
        isAuthenticated: !!loggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use the AuthContext in other components
export const useAuth = () => useContext(AuthContext);
