import type {
  ApiExerciseDetailsType,
  ApiExerciseType,
} from '../types/apiExerciseTypes';
import { exerciseNameCategories } from '../types/exerciseCatalog';
import type {
  ExerciseCategoryType,
  ExerciseType,
} from '../types/exerciseTypes';
import type { DayRoutineType } from '../types/routineTypes';
import type {
  GenerateUnifiedReport,
  UnifiedReportCategoryType,
  UnifiedReportEntryType,
  UnifiedReportIncompleteEntryType,
} from '../types/unifiedReportTypes';
import {
  getRawExerciseName,
  normalizeExerciseName,
  toExerciseCategory,
} from './normalizeExercise';
import {
  getMissingApiDetails,
  parseApiExerciseDetails,
} from './validateApiExercises';

function getApiDetails({
  muscle,
  difficulty,
  equipments,
}: ApiExerciseType): ApiExerciseDetailsType {
  return { muscle, difficulty, equipments };
}

function isCompleteApiExercise(exercise: ApiExerciseType): boolean {
  return getMissingApiDetails(exercise).length === 0;
}

// a routine exercise registered from this api exercise of the catalog
function isLoggedFromApiExercise(
  exercise: ExerciseType,
  apiExercise: ApiExerciseType
): boolean {
  return (
    exercise.source === 'ninja' &&
    toExerciseCategory(apiExercise.category) === exercise.exerciseCategory &&
    normalizeExerciseName(apiExercise.name) ===
      normalizeExerciseName(exercise.name)
  );
}

function findApiExercise(
  exercise: ExerciseType,
  addedExercises: ApiExerciseType[]
): ApiExerciseType | undefined {
  return addedExercises.find((apiExercise) =>
    isLoggedFromApiExercise(exercise, apiExercise)
  );
}

function buildLoggedEntry(
  day: DayRoutineType['day'],
  exercise: ExerciseType,
  addedExercises: ApiExerciseType[]
): UnifiedReportEntryType[] {
  // local exercises have no api details
  if (exercise.source !== 'ninja') {
    return [{ status: 'logged', day, exercise, details: null }];
  }

  const apiExercise = findApiExercise(exercise, addedExercises);

  // registered from an incomplete api exercise: it goes to the incomplete list
  if (apiExercise && !isCompleteApiExercise(apiExercise)) return [];

  return [
    {
      status: 'logged',
      day,
      exercise,
      details: apiExercise ? getApiDetails(apiExercise) : null,
    },
  ];
}

function buildCategoryReport(
  category: ExerciseCategoryType,
  entries: DayRoutineType[],
  addedExercises: ApiExerciseType[]
): UnifiedReportCategoryType {
  const loggedEntries = entries.flatMap((session) =>
    session.exercises
      .filter((exercise) => exercise.exerciseCategory === category)
      .flatMap((exercise) =>
        buildLoggedEntry(session.day, exercise, addedExercises)
      )
  );

  const loggedNames = new Set(
    entries.flatMap((session) =>
      session.exercises
        .filter((exercise) => exercise.exerciseCategory === category)
        .map((exercise) => normalizeExerciseName(exercise.name))
    )
  );

  // complete api exercises from the catalog that were never registered in the routine
  const notLoggedEntries = addedExercises.flatMap(
    (exercise): UnifiedReportEntryType[] =>
      toExerciseCategory(exercise.category) === category &&
      isCompleteApiExercise(exercise) &&
      !loggedNames.has(normalizeExerciseName(exercise.name))
        ? [
            {
              status: 'not-logged',
              name: exercise.name,
              details: getApiDetails(exercise),
            },
          ]
        : []
  );

  const reportEntries = [...loggedEntries, ...notLoggedEntries];

  return {
    category,
    entries: reportEntries,
    totalExercises: reportEntries.length,
    // only logged exercises have minutes
    totalMinutes: reportEntries.reduce(
      (total, entry) =>
        entry.status === 'logged' ? total + entry.exercise.duration : total,
      0
    ),
  };
}

// unified report of local and api exercises by category (pure: no UI, no network)
export const generateUnifiedReport: GenerateUnifiedReport = (
  entries,
  addedExercises,
  incomplete
) => {
  const categories = exerciseNameCategories.map((category) =>
    buildCategoryReport(category, entries, addedExercises)
  );

  const addedIncomplete = addedExercises.filter(
    (exercise) => !isCompleteApiExercise(exercise)
  );

  // each routine session of an incomplete api exercise, like the category rows
  const incompleteLogged = entries.flatMap((session) =>
    session.exercises.flatMap((exercise): UnifiedReportEntryType[] => {
      const apiExercise = addedIncomplete.find((added) =>
        isLoggedFromApiExercise(exercise, added)
      );
      return apiExercise
        ? [
            {
              status: 'logged',
              day: session.day,
              exercise,
              details: getApiDetails(apiExercise),
            },
          ]
        : [];
    })
  );

  const incompleteNotLogged = addedIncomplete.flatMap(
    (apiExercise): UnifiedReportEntryType[] =>
      entries.some((session) =>
        session.exercises.some((exercise) =>
          isLoggedFromApiExercise(exercise, apiExercise)
        )
      )
        ? []
        : [
            {
              status: 'not-logged',
              name: apiExercise.name,
              details: getApiDetails(apiExercise),
            },
          ]
  );

  const pendingIncomplete = incomplete.map(
    (exercise): UnifiedReportIncompleteEntryType => ({
      status: 'pending',
      name: getRawExerciseName(exercise.raw) || 'Unnamed exercise',
      reasons: exercise.reasons,
      details: parseApiExerciseDetails(exercise.raw),
    })
  );

  // counted like the categories; pending ones were never added, so they count nowhere
  const incompleteExercises =
    incompleteLogged.length + incompleteNotLogged.length;
  const incompleteMinutes = incompleteLogged.reduce(
    (total, entry) =>
      entry.status === 'logged' ? total + entry.exercise.duration : total,
    0
  );

  return {
    categories,
    totalExercises:
      categories.reduce(
        (total, category) => total + category.totalExercises,
        0
      ) + incompleteExercises,
    totalMinutes:
      categories.reduce((total, category) => total + category.totalMinutes, 0) +
      incompleteMinutes,
    incomplete: [
      ...incompleteLogged,
      ...incompleteNotLogged,
      ...pendingIncomplete,
    ],
    incompleteExercises,
    incompleteMinutes,
  };
};
