import { useState, useCallback } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (asyncFunction) => {
    setLoading(true);

    try {
      return await asyncFunction();
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, execute };
};
