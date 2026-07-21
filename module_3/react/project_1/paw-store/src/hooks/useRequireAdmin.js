import { useEffect } from 'react';

export const useRequireAdmin = (isAdmin, setCurrentPage) => {
  useEffect(() => {
    if (!isAdmin) {
      setCurrentPage('home');
    }
  }, [isAdmin, setCurrentPage]);
};
