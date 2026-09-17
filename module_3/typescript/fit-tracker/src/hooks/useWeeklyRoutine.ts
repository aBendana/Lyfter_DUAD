import { useContext } from 'react';
import { WeeklyRoutineContext } from '../context/WeeklyRoutineContext';

// custom hook to access the weekly routine context
export function useWeeklyRoutine() {
  const context = useContext(WeeklyRoutineContext);

  // guard clause to ensure the hook is used within the provider
  if (!context) {
    throw new Error(
      'useWeeklyRoutine must be used within a WeeklyRoutineProvider'
    );
  }

  return context;
}
