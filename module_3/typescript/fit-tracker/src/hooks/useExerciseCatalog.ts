import { useContext } from 'react';
import { ExerciseCatalogContext } from '../context/ExerciseCatalogContext';

export function useExerciseCatalog() {
  const context = useContext(ExerciseCatalogContext);

  if (!context) {
    throw new Error(
      'useExerciseCatalog must be used within an ExerciseCatalogProvider'
    );
  }

  return context;
}
