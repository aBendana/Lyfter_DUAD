import { totalIncompleteExercises } from '../../utils/calculations';
import type { DayRoutineType } from '../../types/routineTypes';

export function IncompleteRoutines({ entries }: { entries: DayRoutineType[] }) {
  const incompleteCount = totalIncompleteExercises(entries);

  return (
    <div className="incomplete-routines">
      {entries.length === 0 && <p>No routines available.</p>}

      {entries.length > 0 && incompleteCount === 0 && (
        <p>All exercises are complete!</p>
      )}

      {incompleteCount > 0 && (
        <>
          <h2>Incomplete Routines</h2>
          <p className="incomplete-routines__count">
            Total incomplete exercises: {incompleteCount}
          </p>
          <p className="incomplete-routines__advice">
            If you're having trouble completing exercises, consider adjusting
            your routine or seeking guidance with your assigned trainer.
          </p>
        </>
      )}
    </div>
  );
}
