import { useCallback } from 'react';
import { useCatalog } from '../context/CatalogContext';

export const useDeleteProduct = () => {
  const { setCatalog } = useCatalog();

  return useCallback(
    (productId) => {
      const deleteConfirmation = window.confirm(
        'Seguro que deseas eliminar este producto?'
      );

      if (!deleteConfirmation) {
        return;
      }

      setCatalog((currentCatalog) =>
        currentCatalog.filter((product) => product.id !== productId)
      );
    },
    [setCatalog]
  );
};
