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

  const fewDays = totaldays < 3;
  const manyDays = totaldays > 5;
  const fewMinutes = totalminutes < 150;
  const manyMinutes = totalminutes > 300;

  if (fewDays && fewMinutes) {
    return (
      `You only train ${totaldays} day(s) and ${totalminutes} minutes a week. ` +
      'Try to be more consistent: aim for at least 3 days and 150 minutes of activity ' +
      'to build effective and healthy habits.'
    );
  }

  if (fewDays && manyMinutes) {
    return (
      `You only train ${totaldays} day(s) a week, but you pack ${totalminutes} minutes into them, ` +
      'which overloads your body on those days. Spread your workouts across at least 3 days ' +
      'and keep the total under 300 minutes.'
    );
  }

  if (fewDays) {
    return (
      `You only train ${totaldays} day(s) a week. Your ${totalminutes} minutes are fine, ` +
      'but try to spread them across at least 3 days to be more consistent.'
    );
  }

  if (manyDays && fewMinutes) {
    return (
      `You train ${totaldays} days a week, but only ${totalminutes} minutes in total. ` +
      'You are training too many days for so little activity: consolidate your sessions, ' +
      'include rest days and aim for at least 150 minutes.'
    );
  }

  if (manyDays && manyMinutes) {
    return (
      `You train ${totaldays} days and ${totalminutes} minutes a week. That is too much on both counts, ` +
      'and it may lead to burnout or injury. Reduce your days and minutes and prioritize rest and recovery.'
    );
  }

  if (manyDays) {
    return (
      `You train ${totaldays} days a week, more than the recommended maximum of 5. ` +
      'Your minutes are fine, but include at least 2 rest days: rest is a fundamental part of any effective workout.'
    );
  }

  if (fewMinutes) {
    return (
      `You train ${totaldays} days a week, which is great, but only ${totalminutes} minutes in total. ` +
      'Try to make your sessions a bit longer to reach at least 150 minutes.'
    );
  }

  if (manyMinutes) {
    return (
      `You train ${totaldays} days a week, which is great, but ${totalminutes} minutes is above the recommended 300. ` +
      'Shorten your sessions to avoid burnout or injury.'
    );
  }

  return (
    'Excellent consistency! You are maintaining a great routine. ' +
    'You are showing what it takes to have a healthy lifestyle. ' +
    'Just keep it up!'
  );
}
