import { useCallback } from 'react';

// this hook is used to navigate to the edit product page and set the selected product ID
export const useEditProduct = ({ setCurrentPage, setSelectedProductId }) => {
  return useCallback(
    (productId) => {
      setSelectedProductId(productId);
      setCurrentPage('edit-product');
    },
    [setCurrentPage, setSelectedProductId]
  );
};
