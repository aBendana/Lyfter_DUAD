import type { ActivityType } from '../types/activityTypes';
import type { CatalogExerciseType } from '../types/catalogExerciseTypes';
import type { InstructorInfoType, MemberProfileType } from '../types/userTypes';
import { generateLocalCatalog } from '../utils/generateLocalCatalog';
import { Store } from './Store';

// module-level instances: the single source of truth while the app runs,
// every provider reads and writes through them
export const memberStore = new Store<MemberProfileType>();
export const instructorStore = new Store<InstructorInfoType>();
// local exercises are seeded here; api exercises join the same store later
export const exerciseCatalogStore = new Store<CatalogExerciseType>(
  generateLocalCatalog()
);
// keeps the whole history; the admin view decides how many entries to show
export const activityStore = new Store<ActivityType>();
