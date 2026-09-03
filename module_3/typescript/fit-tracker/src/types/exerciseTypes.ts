export type DistanceSportType =
  | 'Running'
  | 'Cycling'
  | 'Swimming'
  | 'Walking'
  | 'Hiking'
  | 'Rowing'
  | 'Tennis'
  | 'Contact Sports'; // basketball, soccer, football

export type NonDistanceSportType =
  | 'Strength Training'
  | 'Yoga'
  | 'Pilates'
  | 'Dancing';

// union type of all sports
export type SportNameType = DistanceSportType | NonDistanceSportType;

export type CaloriesPerMinute = number;

type ExerciseWithDistance = {
  name: DistanceSportType;
  duration: number;
  caloriesPerMinute: CaloriesPerMinute;
  distance: number; // obligatory for distance-based sports
};

type ExerciseWithoutDistance = {
  name: NonDistanceSportType;
  duration: number;
  caloriesPerMinute: CaloriesPerMinute;
};

//
export type ExerciseType = ExerciseWithDistance | ExerciseWithoutDistance;
