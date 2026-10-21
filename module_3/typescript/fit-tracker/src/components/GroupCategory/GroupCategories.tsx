import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import type { ExerciseCategoryType } from '../../types/exerciseTypes';
import { GroupExercises } from './GroupExercises';
import { generateCategoryWeeklyResumeDescription } from '../../utils/generateDescriptions';

const categorySections: {
  category: ExerciseCategoryType;
  heading: string;
  id: string;
}[] = [
  { category: 'Cardio', heading: 'Cardio Exercises', id: 'cardio-exercises' },
  {
    category: 'Strength',
    heading: 'Strength Exercises',
    id: 'strength-exercises',
  },
  {
    category: 'Flexibility',
    heading: 'Flexibility Exercises',
    id: 'flexibility-exercises',
  },
];

export function GroupCategoriesResume() {
  const { officialEntries: routineEntries } = useWeeklyRoutine();

  return (
    <>
      {categorySections.map(({ category, heading, id }) => {
        const hasExercises = routineEntries.some((session) =>
          session.exercises.some(
            (exercise) => exercise.exerciseCategory === category
          )
        );

        return (
          hasExercises && (
            <section
              className="weekly-routine-resume__exercises"
              aria-labelledby={id}
              key={category}
            >
              <div className="weekly-routine-resume__section-heading">
                <h2 id={id}>{heading}</h2>
                <p className="weekly-routine-resume__section-description">
                  {generateCategoryWeeklyResumeDescription(
                    routineEntries,
                    category
                  )}
                </p>
              </div>

              <GroupExercises
                routineEntries={routineEntries}
                category={category}
              />
            </section>
          )
        );
      })}
    </>
  );
}
