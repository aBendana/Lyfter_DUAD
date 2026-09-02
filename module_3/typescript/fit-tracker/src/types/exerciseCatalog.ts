// this module is used to define the types of exercises
// that can be in the options of the UI select input
// for the user to choose sports

import type { DistanceSportType, NonDistanceSportType } from './exerciseTypes';

// array of distance-based sports,
export const distanceNameExercises: DistanceSportType[] = [
  'Running',
  'Cycling',
  'Swimming',
  'Walking',
  'Hiking',
  'Rowing',
  'Tennis',
  'Contact Sports',
];

// array of non-distance-based sports
export const nonDistanceNameExercises: NonDistanceSportType[] = [
  'Strength Training',
  'Yoga',
  'Pilates',
  'Dancing',
];
