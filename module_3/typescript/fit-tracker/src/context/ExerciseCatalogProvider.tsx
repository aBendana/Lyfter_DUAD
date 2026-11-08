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
import {
  cardioNameExercises,
  flexibilityNameExercises,
  strengthNameExercises,
} from '../types/exerciseCatalog';
import type {
  ExerciseCategoryType,
  LocalExerciseNameType,
  SportNameType,
} from '../types/exerciseTypes';
import {
  normalizeExerciseName,
  toExerciseCategory,
} from '../utils/normalizeExercise';
import { ExerciseCatalogContext } from './ExerciseCatalogContext';
import type { ExerciseCatalogCountsType } from './ExerciseCatalogContext';

interface ExerciseCatalogProviderProps {
  children: ReactNode;
}

// decided exercises stay stored so a repeated search does not bring them back
interface StoredIncompleteExerciseType extends IncompleteApiExerciseType {
  status: IncompleteApiExerciseStatusType;
}

function getDefaultExerciseNames(
  category: ExerciseCategoryType
): LocalExerciseNameType[] {
  switch (category) {
    case 'Cardio':
      return cardioNameExercises;
    case 'Strength':
      return strengthNameExercises;
    case 'Flexibility':
      return flexibilityNameExercises;
  }
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

// true when the exercise is a default one or is already in the given added list;
// the list is a parameter so it works with the state and inside a state updater
function isInCatalog(
  addedExercises: ApiExerciseType[],
  category: ApiExerciseCategoryType,
  name: string
): boolean {
  const normalizedName = normalizeExerciseName(name);

  return (
    getDefaultExerciseNames(toExerciseCategory(category)).some(
      (exerciseName) => normalizeExerciseName(exerciseName) === normalizedName
    ) ||
    addedExercises.some(
      (exercise) =>
        exercise.category === category &&
        normalizeExerciseName(exercise.name) === normalizedName
    )
  );
}

export function ExerciseCatalogProvider({
  children,
}: ExerciseCatalogProviderProps) {
  const [addedExercises, setAddedExercises] = useState<ApiExerciseType[]>([]);
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
  ): boolean => isInCatalog(addedExercises, category, name);

  // checks the latest list inside the updater, so two quick adds cannot duplicate it
  const addExercise = (exercise: ApiExerciseType): void => {
    setAddedExercises((currentExercises) =>
      isInCatalog(currentExercises, exercise.category, exercise.name)
        ? currentExercises
        : [...currentExercises, exercise]
    );
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
            ...newExercises.map(
              (exercise): StoredIncompleteExerciseType => ({
                ...exercise,
                status: 'pending',
              })
            ),
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
  ): boolean => {
    const normalizedName = normalizeExerciseName(name);
    return addedExercises.some(
      (exercise) =>
        toExerciseCategory(exercise.category) === category &&
        normalizeExerciseName(exercise.name) === normalizedName
    );
  };

  const getExerciseNames = (
    category: ExerciseCategoryType
  ): SportNameType[] => {
    const defaults: SportNameType[] = getDefaultExerciseNames(category);
    const added = addedExercises
      .filter((exercise) => toExerciseCategory(exercise.category) === category)
      .map((exercise) => exercise.name);

    return [...new Set([...defaults, ...added])];
  };

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
    category: ExerciseCategoryType
  ): ExerciseCatalogCountsType => ({
    local: getDefaultExerciseNames(category).length,
    ninja: addedExercises.filter(
      (exercise) => toExerciseCategory(exercise.category) === category
    ).length,
  });

  return (
    <ExerciseCatalogContext.Provider
      value={{
        addedExercises,
        addExercise,
        addIncompleteExercises,
        resolveIncompleteExercise,
        getIncompleteExerciseStatus,
        incompleteExercises,
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
