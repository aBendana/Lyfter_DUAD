import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

export const useRequireAdmin = (isAdmin, delay = 7000) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      const timer = setTimeout(() => {
        navigate(ROUTES.HOME);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, delay, navigate]);
};
