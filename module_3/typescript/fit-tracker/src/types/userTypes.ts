export type ExperienceLevelType = 'Beginner' | 'Intermediate' | 'Advanced';

export type UserProfileType = {
  fullName: string;
  age: number;
  experienceLevel: ExperienceLevelType;
};
