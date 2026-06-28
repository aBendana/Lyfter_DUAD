import { createElement, useEffect, useState } from 'react';
import Loading from '../components/Loading';

export const useLoadingEffect = (currentPage) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPage !== 'products') {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, [currentPage, setLoading]);

  if (currentPage === 'products' && loading) {
    return createElement(Loading);
  }

  return null;
};
