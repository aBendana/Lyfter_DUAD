// ids types branded for type safety
// to prevent mixing different id types
export type ExerciseId = string & { readonly __brand: 'ExerciseId' };

export type UserId = string & { readonly __brand: 'UserId' };

export type RoutineId = string & { readonly __brand: 'RoutineId' };

export type WeeklyRoutineId = string & { readonly __brand: 'WeeklyRoutineId' };
