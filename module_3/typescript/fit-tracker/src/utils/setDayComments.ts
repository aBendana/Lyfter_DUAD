import type { DayRoutineId } from '../types/idsTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';

// returns an updated copy of the routine with the session's comments changed;
// empty comments remove the note
export function setDayComments(
  routine: WeeklyRoutineType,
  dayRoutineId: DayRoutineId,
  dayComments: string
): WeeklyRoutineType {
  const trimmedComments = dayComments.trim();

  return {
    ...routine,
    entries: routine.entries.map((session) =>
      session.id === dayRoutineId
        ? { ...session, dayComments: trimmedComments || undefined }
        : session
    ),
  };
}
