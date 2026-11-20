import type { ActivityType } from '../types/activityTypes';
import type { CatalogExerciseType } from '../types/catalogExerciseTypes';
import type { InstructorInfoType, MemberProfileType } from '../types/userTypes';
import type { WeeklyRoutineType } from '../types/weeklyRoutineTypes';
import { generateLocalCatalog } from '../utils/generateLocalCatalog';
import { Store } from './Store';

// module-level instances: the single source of truth while the app runs,
// every provider reads and writes through them
export const memberStore = new Store<MemberProfileType>();
// each routine keeps its owner's memberId, so routines are counted
// and searched without going through the members
export const routineStore = new Store<WeeklyRoutineType>();
export const instructorStore = new Store<InstructorInfoType>();
// local exercises are seeded here; api exercises join the same store later
export const exerciseCatalogStore = new Store<CatalogExerciseType>(
  generateLocalCatalog()
);
// keeps the whole history; the admin view decides how many entries to show
export const activityStore = new Store<ActivityType>();
