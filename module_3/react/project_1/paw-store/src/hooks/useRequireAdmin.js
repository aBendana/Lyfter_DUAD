import { useEffect } from 'react';

export const useRequireAdmin = (isAdmin, setCurrentPage, delay = 7000) => {
  useEffect(() => {
    if (!isAdmin) {
      const timer = setTimeout(() => {
        setCurrentPage('home');
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, setCurrentPage, delay]);
};
