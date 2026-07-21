import { useCallback } from 'react';
import { useProducts } from '../context/ProductsContext';

export const useDeleteProduct = () => {
  const { deleteProduct } = useProducts();

  return useCallback(
    async (productId) => {
      const deleteConfirmation = window.confirm(
        'Seguro que deseas eliminar este producto?'
      );

      if (!deleteConfirmation) {
        return;
      }

      await deleteProduct(productId);
    },
    [deleteProduct]
  );
};
