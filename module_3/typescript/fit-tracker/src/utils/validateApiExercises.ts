import type {
  ApiExerciseCategoryType,
  ApiExerciseReportType,
  ApiExerciseValidationType,
}  from '../types/apiExerciseTypes';

// type guards for basic value checks
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// the API `type` field is mapped explicitly; anything unknown value yields null (never guessed)
function toCategory(apiType: unknown): ApiExerciseCategoryType | null {
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

function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim() !== '';
}

// validates one unknown item and reports every reason it is rejected (pure: no UI, no network)
export function validateApiExercise(raw: unknown): ApiExerciseValidationType {
  if (!isRecord(raw)) {
    return { status: 'invalid', reasons: ['Exercise is not an object'] };
  }

  const reasons: string[] = [];
  const { name, type } = raw;

  const exerciseName = isNonEmptyString(name) ? name.trim() : null;
  if (exerciseName === null) reasons.push('Missing or empty "name"');

  const category = toCategory(type);
  if (category === null) {
    reasons.push(
      isString(type)
        ? `Unsupported "type": ${type}`
        : 'Missing or invalid "type"',
    );
  }

  if (reasons.length > 0 || exerciseName === null || category === null) {
    return { status: 'invalid', reasons };
  }

  return {
    status: 'valid',
    exercise: {
      category,
      name: exerciseName,
    },
  };
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
