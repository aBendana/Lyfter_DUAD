import { useState } from 'react';
import type { ReactNode } from 'react';
import type {
  ApiExerciseCategoryType,
  ApiExerciseType,
} from '../types/apiExerciseTypes';
import {
  cardioNameExercises,
  flexibilityNameExercises,
  strengthNameExercises,
} from '../types/exerciseCatalog';
import type { ExerciseCategoryType } from '../types/exerciseTypes';
import { ExerciseCatalogContext } from './ExerciseCatalogContext';
import type { ExerciseCatalogCountsType } from './ExerciseCatalogContext';

interface ExerciseCatalogProviderProps {
  children: ReactNode;
}

function toExerciseCategory(
  category: ApiExerciseCategoryType
): ExerciseCategoryType {
  switch (category) {
    case 'cardio':
      return 'Cardio';
    case 'strength':
      return 'Strength';
    case 'flexibility':
      return 'Flexibility';
  }
}

function normalizeExerciseName(name: string): string {
  return name.trim().toLowerCase();
}

function getDefaultExerciseNames(category: ExerciseCategoryType): string[] {
  switch (category) {
    case 'Cardio':
      return cardioNameExercises;
    case 'Strength':
      return strengthNameExercises;
    case 'Flexibility':
      return flexibilityNameExercises;
  }
}

export function ExerciseCatalogProvider({
  children,
}: ExerciseCatalogProviderProps) {
  const [addedExercises, setAddedExercises] = useState<ApiExerciseType[]>([]);

  const hasExercise = (
    category: ApiExerciseCategoryType,
    name: string
  ): boolean => {
    const internalCategory = toExerciseCategory(category);
    const normalizedName = normalizeExerciseName(name);

    return (
      getDefaultExerciseNames(internalCategory).some(
        (exerciseName) => normalizeExerciseName(exerciseName) === normalizedName
      ) ||
      addedExercises.some(
        (exercise) =>
          exercise.category === category &&
          normalizeExerciseName(exercise.name) === normalizedName
      )
    );
  };

  const addExercise = (exercise: ApiExerciseType): void => {
    if (hasExercise(exercise.category, exercise.name)) return;
    setAddedExercises((currentExercises) => {
      const internalCategory = toExerciseCategory(exercise.category);
      const normalizedName = normalizeExerciseName(exercise.name);
      const alreadyAdded =
        getDefaultExerciseNames(internalCategory).some(
          (exerciseName) =>
            normalizeExerciseName(exerciseName) === normalizedName
        ) ||
        currentExercises.some(
          (currentExercise) =>
            currentExercise.category === exercise.category &&
            normalizeExerciseName(currentExercise.name) === normalizedName
        );

      return alreadyAdded ? currentExercises : [...currentExercises, exercise];
    });
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

  const getExerciseNames = (category: ExerciseCategoryType): string[] => {
    const defaults = getDefaultExerciseNames(category);
    const added = addedExercises
      .filter(
        (exercise) => toExerciseCategory(exercise.category) === category
      )
      .map((exercise) => exercise.name);

    return [...new Set([...defaults, ...added])];
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
        addExercise,
        getExerciseCounts,
        getExerciseNames,
        hasExercise,
        isApiExercise,
      }}
    >
      {children}
    </ExerciseCatalogContext.Provider>
  );
}
