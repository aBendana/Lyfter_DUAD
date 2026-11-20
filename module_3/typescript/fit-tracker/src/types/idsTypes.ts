// ids types branded for type safety
// to prevent mixing different id types
// numeric so every entity satisfies the store constraint { id: number }
export type ExerciseId = number & { readonly __brand: 'ExerciseId' };

export type MemberId = number & { readonly __brand: 'MemberId' };

export type InstructorId = number & { readonly __brand: 'InstructorId' };

export type DayRoutineId = number & { readonly __brand: 'DayRoutineId' };

export type WeeklyRoutineId = number & { readonly __brand: 'WeeklyRoutineId' };

// a catalog entry, not a logged exercise inside a routine
export type CatalogExerciseId = number & {
  readonly __brand: 'CatalogExerciseId';
};

// an entry of the activity log
export type ActivityId = number & { readonly __brand: 'ActivityId' };
