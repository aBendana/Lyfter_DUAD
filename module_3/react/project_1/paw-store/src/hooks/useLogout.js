import { useState } from 'react';
import { authService } from '../services/authService';

export const useLogout = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const logout = () => {
    authService.logout();
    setCurrentPage('home');
  };
  return { currentPage, logout };
};
