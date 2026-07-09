import { useCallback } from 'react';

const validPages = [
  'home',
  'products',
  'product-details',
  'admin',
  'edit-product',
];

export const useExistsCurrentPage = (setCurrentPage) => {
  return useCallback(
    (nextPage) => {
      setCurrentPage(validPages.includes(nextPage) ? nextPage : 'home');
    },
    [setCurrentPage]
  );
};
