import type { DayRoutineType } from '../types/routineTypes';
import type { WeeklyLoadType } from '../types/weeklyLoadTypes';
import { totalTime, totalTrainingSessions } from './calculations';

// same limits as generateRecommendations: 3-5 days and 150-300 minutes;
// too much is checked first, overload matters more than training too little
export function getWeeklyLoad(entries: DayRoutineType[]): WeeklyLoadType {
  const days = totalTrainingSessions(entries);
  const minutes = totalTime(entries);

  if (days === 0 || minutes === 0) return 'none';
  if (days > 5 || minutes > 300) return 'high';
  if (days < 3 || minutes < 150) return 'low';
  return 'balanced';
}
