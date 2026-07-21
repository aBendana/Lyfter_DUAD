import { useEffect, useState } from 'react';

export const useLoadingEffect = (currentPage) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentPage !== 'products' && currentPage !== 'admin') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, [currentPage, setIsLoading]);

  return (currentPage === 'products' || currentPage === 'admin') && isLoading;
};
