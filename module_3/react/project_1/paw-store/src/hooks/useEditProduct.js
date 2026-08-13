import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

// this hook is used to navigate to the edit product page and set the selected product ID
export const useEditProduct = () => {
  const navigate = useNavigate();

  return useCallback(
    (productId) => {
      navigate(ROUTES.EDIT_PRODUCT.replace(':id', productId));
    },
    [navigate]
  );
};
