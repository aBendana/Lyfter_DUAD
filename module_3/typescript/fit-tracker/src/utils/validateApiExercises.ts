import type {
  ApiExerciseCategoryType,
  ApiExerciseDetailsType,
  ApiExerciseDifficulty,
  ApiExerciseReportType,
  ApiExerciseType,
  ApiExerciseValidationType,
}  from '../types/apiExerciseTypes';
import type { ApiExerciseNameType } from '../types/exerciseTypes';
import {
  isApiExerciseName,
  isApiMuscle,
  isExerciseDifficulty,
} from './typeGuards';

// Minimum fields FitTracker requires from an api exercise:
// - name: identifies the exercise in the catalog and in the routine
// - type: maps to the category (Cardio, Strength, Flexibility)
// - muscle: tells the member and the instructor what the exercise trains
// - difficulty: lets the instructor check that it fits the member's level
// - equipments: list of what is needed to do the exercise (at least one item)
// Optional, not required and not stored: instructions, safety_info.
// An exercise missing any required field goes to "incomplete data".
// There the user decides: discard it, or add it with "Not Specified" in the missing
// muscle, difficulty or equipments. Without a name or a type it cannot be
// added, because it would have no identity or category.

// type guards for basic value checks
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim() !== '';
}

// each parser returns the valid value or null (never guessed)
function parseName(value: unknown): ApiExerciseNameType | null {
  if (!isString(value)) return null;

  const name = value.trim();
  return isApiExerciseName(name) ? name : null;
}

// the API `type` field is mapped explicitly
function parseCategory(apiType: unknown): ApiExerciseCategoryType | null {
  switch (apiType) {
    case 'cardio':
      return 'cardio';
    case 'strength':
    case 'powerlifting':
    case 'olympic_weightlifting':
    case 'plyometrics':
    case 'strongman':
      return 'strength';
    case 'stretching':
      return 'flexibility';
    default:
      return null;
  }
}

function parseMuscle(value: unknown): string | null {
  return isString(value) && isApiMuscle(value.trim()) ? value.trim() : null;
}

function parseDifficulty(value: unknown): ApiExerciseDifficulty | null {
  return isString(value) && isExerciseDifficulty(value) ? value : null;
}

// the api sends a list with no fixed values, so any non-empty text item is kept;
// an empty list, or one without valid items, counts as missing
function parseEquipments(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;

  const equipments = value
    .filter(isNonEmptyString)
    .map((equipment) => equipment.trim());
  return equipments.length > 0 ? equipments : null;
}

function invalidFieldReason(field: string, value: unknown): string {
  return isNonEmptyString(value)
    ? `Unsupported "${field}": ${value}`
    : `Missing or invalid "${field}"`;
}

// validates one unknown item and reports every reason it is rejected (pure: no UI, no network)
export function validateApiExercise(raw: unknown): ApiExerciseValidationType {
  if (!isRecord(raw)) {
    return { status: 'invalid', reasons: ['Exercise is not an object'] };
  }

  const reasons: string[] = [];
  const { name, type, muscle, difficulty, equipments } = raw;

  const exerciseName = parseName(name);
  if (exerciseName === null) reasons.push('Incomplete info "name"');

  const category = parseCategory(type);
  if (category === null) reasons.push(invalidFieldReason('type', type));

  const exerciseMuscle = parseMuscle(muscle);
  if (exerciseMuscle === null) {
    reasons.push(invalidFieldReason('muscle', muscle));
  }

  const exerciseDifficulty = parseDifficulty(difficulty);
  if (exerciseDifficulty === null) {
    reasons.push(invalidFieldReason('difficulty', difficulty));
  }

  const exerciseEquipments = parseEquipments(equipments);
  if (exerciseEquipments === null) {
    reasons.push('Incomplete info "equipments"');
  }

  if (
    exerciseName === null ||
    category === null ||
    exerciseMuscle === null ||
    exerciseDifficulty === null ||
    exerciseEquipments === null
  ) {
    return { status: 'invalid', reasons };
  }

  return {
    status: 'valid',
    exercise: {
      category,
      name: exerciseName,
      muscle: exerciseMuscle,
      difficulty: exerciseDifficulty,
      equipments: exerciseEquipments,
    },
  };
}

// the user chose to add an incomplete exercise: missing details become null ("Not Specified");
// returns null when it has no valid name or type, so it can only be discarded
export function acceptIncompleteApiExercise(
  raw: unknown
): ApiExerciseType | null {
  if (!isRecord(raw)) return null;

  const name = parseName(raw.name);
  const category = parseCategory(raw.type);
  if (name === null || category === null) return null;

  return {
    name,
    category,
    muscle: parseMuscle(raw.muscle),
    difficulty: parseDifficulty(raw.difficulty),
    equipments: parseEquipments(raw.equipments),
  };
}

// the valid details of any raw item; the invalid or missing ones become null
export function parseApiExerciseDetails(raw: unknown): ApiExerciseDetailsType {
  if (!isRecord(raw)) {
    return { muscle: null, difficulty: null, equipments: null };
  }

  return {
    muscle: parseMuscle(raw.muscle),
    difficulty: parseDifficulty(raw.difficulty),
    equipments: parseEquipments(raw.equipments),
  };
}

// required details an exercise added incomplete by the user is still missing
export function getMissingApiDetails(exercise: ApiExerciseType): string[] {
  const missing: string[] = [];
  if (exercise.muscle === null) missing.push('muscle');
  if (exercise.difficulty === null) missing.push('difficulty');
  if (exercise.equipments === null) missing.push('equipments');
  return missing;
}

// splits a response into exercises for the catalog and incomplete ones to show the user
export function validateApiExercises(raw: unknown): ApiExerciseReportType {
  if (!Array.isArray(raw)) {
    return {
      valid: [],
      incomplete: [{ raw, reasons: ['Response is not a list of exercises'] }],
    };
  }

  const report: ApiExerciseReportType = { valid: [], incomplete: [] };
  for (const item of raw) {
    const result = validateApiExercise(item);
    if (result.status === 'valid') {
      report.valid.push(result.exercise);
    } else {
      report.incomplete.push({ raw: item, reasons: result.reasons });
    }
  }
  return report;
}
