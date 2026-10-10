import type { DayRoutineType } from '../types/routineTypes';
import { totalTime, totalTrainingSessions } from './calculations';

export function generateRecommendations(
  routineEntries: DayRoutineType[]
): string {
  const totaldays = totalTrainingSessions(routineEntries);
  const totalminutes = totalTime(routineEntries);

  if (totaldays === 0 || totalminutes === 0) {
    return 'You do not have any routine registered yet, so let the work begin!';
  }

  if (totaldays < 3 || totalminutes < 150) {
    return (
      'Try to be more consistent with your routine, we recommend aiming ' +
      'for at least 3 days a week and 150 minutes of activity. This minimum ' +
      'helps you build a consistent and effective body and healthy habits.'
    );
  } else if (totaldays > 5 || totalminutes > 300) {
    return (
      'Remember to balance your routine. While consistency is great, ' +
      'overdoing it may lead to burnout or injury. Ensure you have adequate ' +
      'rest and recovery. Remember, rest is a fundamental part of any effective workout.'
    );
  } else {
    return (
      'Excellent consistency! You are maintaining a great routine. ' +
      'You are showing what needs to have a healthy lifestyle.' +
      'Just keep it up!'
    );
  }
}
