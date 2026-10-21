import { useContext } from 'react';
import { MemberRoutineContext } from '../context/MemberRoutineContext';

export function useMemberRoutine() {
  const context = useContext(MemberRoutineContext);

  if (!context) {
    throw new Error('useMemberRoutine must be used within a MemberRoutineProvider');
  }

  return context;
}