import type {
  ApiExerciseDetailsType,
  ApiExerciseType,
  IncompleteApiExerciseType,
} from './apiExerciseTypes';
import type { ExerciseCategoryType, ExerciseType } from './exerciseTypes';
import type { DayOfWeekType, DayRoutineType } from './routineTypes';

// logged: registered in the routine, local or api (see `exercise.source`)
// not-logged: api exercise in the catalog, it has no training data yet
// details: muscle, difficulty and equipments, only known for api exercises
export type UnifiedReportEntryType =
  | {
      status: 'logged';
      day: DayOfWeekType;
      exercise: ExerciseType;
      details: ApiExerciseDetailsType | null;
    }
  | { status: 'not-logged'; name: string; details: ApiExerciseDetailsType };

// api exercises that did not pass validation, listed apart from the categories
// with the same rows; missing details are null ("Not Specified")
// logged / not-logged: added by the user with incomplete info; it was trained,
// so its sessions count in the general totals
// pending: the user has not decided yet in Ninja Exercises; it counts nowhere
export type UnifiedReportIncompleteEntryType =
  | UnifiedReportEntryType
  | {
      status: 'pending';
      name: string;
      reasons: string[];
      details: ApiExerciseDetailsType;
    };

export interface UnifiedReportCategoryType {
  category: ExerciseCategoryType;
  entries: UnifiedReportEntryType[];
  totalExercises: number;
  totalMinutes: number;
}

// incomplete exercises stay out of the categories but count in the general totals
export interface UnifiedReportType {
  categories: UnifiedReportCategoryType[];
  totalExercises: number;
  totalMinutes: number;
  incomplete: UnifiedReportIncompleteEntryType[];
  incompleteExercises: number;
  incompleteMinutes: number;
}

export type GenerateUnifiedReport = (
  entries: DayRoutineType[],
  addedExercises: ApiExerciseType[],
  incomplete: IncompleteApiExerciseType[]
) => UnifiedReportType;
