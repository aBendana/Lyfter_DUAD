// ids types branded for type safety
// to prevent mixing different id types
export type ExerciseId = string & { readonly __brand: 'ExerciseId' };

export type MemberId = string & { readonly __brand: 'MemberId' };

export type InstructorId = string & { readonly __brand: 'InstructorId' };

export type DayRoutineId = string & { readonly __brand: 'DayRoutineId' };

export type WeeklyRoutineId = string & { readonly __brand: 'WeeklyRoutineId' };
