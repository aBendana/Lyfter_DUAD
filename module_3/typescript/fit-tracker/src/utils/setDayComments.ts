import type { DayRoutineId } from '../types/idsTypes';
import type { DayRoutineType } from '../types/routineTypes';

// returns updated entries with the session's comments changed;
// empty comments remove the note
export function setDayComments(
  entries: readonly DayRoutineType[],
  dayRoutineId: DayRoutineId,
  dayComments: string
): DayRoutineType[] {
  const trimmedComments = dayComments.trim();

  return entries.map((session) =>
    session.id === dayRoutineId
      ? { ...session, dayComments: trimmedComments || undefined }
      : session
  );
}
