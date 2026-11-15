import { useState } from 'react';
import type { ReactNode } from 'react';
import type {
  ApiExerciseCategoryType,
  ApiExerciseType,
  ApiExerciseSearchFilters,
  IncompleteApiExerciseStatusType,
  IncompleteApiExerciseType,
  SearchHistoryEntryType,
} from '../types/apiExerciseTypes';
import type {
  CatalogExerciseType,
  CatalogSourceCountsType,
} from '../types/catalogExerciseTypes';
import type {
  ExerciseCategoryType,
  SportNameType,
} from '../types/exerciseTypes';
import type { ApiError } from '../services/apiErrors';
import {
  getRawExerciseName,
  normalizeExerciseName,
  toExerciseCategory,
} from '../utils/normalizeExercise';
import { getCatalogExerciseCategory } from '../utils/getCatalogExerciseCategory';
import { generateCatalogExerciseId } from '../utils/generateIds';
import { isApiCatalogExercise } from '../utils/typeGuards';
import { exerciseCatalogStore } from '../store/stores';
import { logActivity } from '../store/logActivity';
import { useStore } from '../hooks/useStore';
import { ExerciseCatalogContext } from './ExerciseCatalogContext';

interface ExerciseCatalogProviderProps {
  children: ReactNode;
}

// decided exercises stay stored so a repeated search does not bring them back
interface StoredIncompleteExerciseType extends IncompleteApiExerciseType {
  status: IncompleteApiExerciseStatusType;
}

const MAX_SEARCH_HISTORY = 10;

// same filters -> same key, so a repeated search replaces the old entry
function getSearchFiltersKey(filters: ApiExerciseSearchFilters): string {
  return [
    filters.muscle,
    filters.name?.toLowerCase() ?? '',
    filters.type ?? '',
    filters.difficulty ?? '',
  ].join('|');
}

// a name appears once per category, whatever its source; the list is a
// parameter so it works with the render snapshot and with a fresh store read
function isInCatalog(
  catalog: readonly CatalogExerciseType[],
  category: ExerciseCategoryType,
  name: string
): boolean {
  const normalizedName = normalizeExerciseName(name);

  return catalog.some(
    (exercise) =>
      getCatalogExerciseCategory(exercise) === category &&
      normalizeExerciseName(exercise.name) === normalizedName
  );
}

export function ExerciseCatalogProvider({
  children,
}: ExerciseCatalogProviderProps) {
  // local and api exercises live in the catalog store
  const catalog = useStore(exerciseCatalogStore);
  const addedExercises = catalog.filter(isApiCatalogExercise);
  const [storedIncompleteExercises, setStoredIncompleteExercises] = useState<
    StoredIncompleteExerciseType[]
  >([]);
  // lives in memory like the catalog: it is cleared when the page reloads
  const [searchHistory, setSearchHistory] = useState<SearchHistoryEntryType[]>(
    []
  );
  const incompleteExercises = storedIncompleteExercises.filter(
    (exercise) => exercise.status === 'pending'
  );

  const hasExercise = (
    category: ApiExerciseCategoryType,
    name: string
  ): boolean => isInCatalog(catalog, toExerciseCategory(category), name);

  // reads the store, not the render, so two quick adds cannot duplicate it
  const addExercise = (exercise: ApiExerciseType): void => {
    const category = toExerciseCategory(exercise.category);
    if (isInCatalog(exerciseCatalogStore.getAll(), category, exercise.name)) {
      return;
    }

    exerciseCatalogStore.add({
      ...exercise,
      id: generateCatalogExerciseId(),
      source: 'api',
    });
    logActivity({
      kind: 'catalog-exercise-added',
      exerciseName: exercise.name,
      category,
    });
  };

  // keeps incomplete exercises across searches; the same raw item is stored once
  const addIncompleteExercises = (
    exercises: IncompleteApiExerciseType[]
  ): void => {
    setStoredIncompleteExercises((currentExercises) => {
      const storedExercises = new Set(
        currentExercises.map((exercise) => JSON.stringify(exercise.raw))
      );
      const newExercises = exercises.filter((exercise) => {
        const rawExercise = JSON.stringify(exercise.raw);
        if (storedExercises.has(rawExercise)) return false;
        storedExercises.add(rawExercise);
        return true;
      });

      return newExercises.length > 0
        ? [
            ...currentExercises,
            ...newExercises.map((exercise): StoredIncompleteExerciseType => ({
              ...exercise,
              status: 'pending',
            })),
          ]
        : currentExercises;
    });
  };

  // the user decided: the exercise was added to the catalog, or discarded
  const resolveIncompleteExercise = (
    exercise: IncompleteApiExerciseType,
    decision: Exclude<IncompleteApiExerciseStatusType, 'pending'>
  ): void => {
    const rawExercise = JSON.stringify(exercise.raw);
    setStoredIncompleteExercises((currentExercises) =>
      currentExercises.map((currentExercise) =>
        JSON.stringify(currentExercise.raw) === rawExercise
          ? { ...currentExercise, status: decision }
          : currentExercise
      )
    );

    // an accepted one is already logged by addExercise
    if (decision === 'discarded') {
      logActivity({
        kind: 'catalog-exercise-discarded',
        exerciseName: getRawExerciseName(exercise.raw) || 'Unnamed exercise',
      });
    }
  };

  const logSearchError = (error: ApiError, muscle: string): void => {
    logActivity({ kind: 'api-error', errorKind: error.kind, muscle });
  };

  // pending when it is not stored yet (the search result arrives before the state update)
  const getIncompleteExerciseStatus = (
    exercise: IncompleteApiExerciseType
  ): IncompleteApiExerciseStatusType => {
    const rawExercise = JSON.stringify(exercise.raw);
    const storedExercise = storedIncompleteExercises.find(
      (currentExercise) => JSON.stringify(currentExercise.raw) === rawExercise
    );
    return storedExercise ? storedExercise.status : 'pending';
  };

  const isApiExercise = (
    category: ExerciseCategoryType,
    name: string
  ): boolean => isInCatalog(addedExercises, category, name);

  // store order keeps local exercises first; addExercise already avoids repeats
  const getExerciseNames = (category: ExerciseCategoryType): SportNameType[] =>
    catalog
      .filter((exercise) => getCatalogExerciseCategory(exercise) === category)
      .map((exercise) => exercise.name);

  // the form select sends plain text, so the name is checked against the catalog
  const isCatalogExerciseName = (
    category: ExerciseCategoryType,
    name: string
  ): name is SportNameType =>
    getExerciseNames(category).some((exerciseName) => exerciseName === name);

  // newest first, without repeated filters, up to MAX_SEARCH_HISTORY entries
  const addSearchToHistory = (entry: SearchHistoryEntryType): void => {
    const entryKey = getSearchFiltersKey(entry.filters);
    setSearchHistory((currentHistory) =>
      [
        entry,
        ...currentHistory.filter(
          (currentEntry) =>
            getSearchFiltersKey(currentEntry.filters) !== entryKey
        ),
      ].slice(0, MAX_SEARCH_HISTORY)
    );
  };

  const clearSearchHistory = (): void => {
    setSearchHistory([]);
  };

  const getExerciseCounts = (
    category?: ExerciseCategoryType
  ): CatalogSourceCountsType => {
    const exercises =
      category === undefined
        ? catalog
        : catalog.filter(
            (exercise) => getCatalogExerciseCategory(exercise) === category
          );
    const api = exercises.filter(isApiCatalogExercise).length;

    return { local: exercises.length - api, api };
  };

  return (
    <ExerciseCatalogContext.Provider
      value={{
        addedExercises,
        addExercise,
        addIncompleteExercises,
        resolveIncompleteExercise,
        getIncompleteExerciseStatus,
        incompleteExercises,
        logSearchError,
        getExerciseCounts,
        getExerciseNames,
        hasExercise,
        isApiExercise,
        isCatalogExerciseName,
        searchHistory,
        addSearchToHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </ExerciseCatalogContext.Provider>
  );
}
