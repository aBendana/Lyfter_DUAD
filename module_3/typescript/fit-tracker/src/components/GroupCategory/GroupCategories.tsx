import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import { GroupExercises } from './GroupExercises';
import { generateCategoryWeeklyResumeDescription } from '../../utils/generateDescriptions';

export function GroupCategoriesResume() {
  const { routineEntries } = useWeeklyRoutine();

  // defining the cardio entries
  const cardioEntries = routineEntries.filter(
    (entry) => entry.exercise.exerciseCategory === 'Cardio'
  );

  // defining the strength entries
  const strengthEntries = routineEntries.filter(
    (entry) => entry.exercise.exerciseCategory === 'Strength'
  );

  // defining the flexibility entries
  const flexibilityEntries = routineEntries.filter(
    (entry) => entry.exercise.exerciseCategory === 'Flexibility'
  );

  return (
    <>
      {cardioEntries.length > 0 && (
        <section
          className="weekly-routine-resume__exercises"
          aria-labelledby="exercises-title"
        >
          <div className="weekly-routine-resume__section-heading">
            <h2 id="exercises-title">Cardio Exercises</h2>
            <p className="weekly-routine-resume__section-description">
              {generateCategoryWeeklyResumeDescription(cardioEntries)}
            </p>
          </div>

          <GroupExercises routineEntries={cardioEntries} />
        </section>
      )}

      {strengthEntries.length > 0 && (
        <section
          className="weekly-routine-resume__exercises"
          aria-labelledby="strength-exercises-title"
        >
          <div className="weekly-routine-resume__section-heading">
            <h2 id="strength-exercises-title">Strength Exercises</h2>
            <p className="weekly-routine-resume__section-description">
              {generateCategoryWeeklyResumeDescription(strengthEntries)}
            </p>
          </div>

          <GroupExercises routineEntries={strengthEntries} />
        </section>
      )}

      {flexibilityEntries.length > 0 && (
        <section
          className="weekly-routine-resume__exercises"
          aria-labelledby="flexibility-exercises-title"
        >
          <div className="weekly-routine-resume__section-heading">
            <h2 id="flexibility-exercises-title">Flexibility Exercises</h2>
            <p className="weekly-routine-resume__section-description">
              {generateCategoryWeeklyResumeDescription(flexibilityEntries)}
            </p>
          </div>

          <GroupExercises routineEntries={flexibilityEntries} />
        </section>
      )}
    </>
  );
}
