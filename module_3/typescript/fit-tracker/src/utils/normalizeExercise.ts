import type {
  ApiExerciseCategoryType,
  ApiExerciseSearchFilters,
} from '../types/apiExerciseTypes';
import type { ExerciseCategoryType } from '../types/exerciseTypes';

export function toExerciseCategory(
  category: ApiExerciseCategoryType
): ExerciseCategoryType {
  switch (category) {
    case 'cardio':
      return 'Cardio';
    case 'strength':
      return 'Strength';
    case 'flexibility':
      return 'Flexibility';
  }
}

export function normalizeExerciseName(name: string): string {
  return name.trim().toLowerCase();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// text field of an item that failed validation, empty when it has none
export function getRawStringField(raw: unknown, field: string): string {
  if (!isRecord(raw)) return '';

  const value = raw[field];
  return typeof value === 'string' ? value.trim() : '';
}

export function getRawExerciseName(raw: unknown): string {
  return getRawStringField(raw, 'name');
}

// api values (muscles, types, difficulties, equipments) as UI labels:
// every "_" or space separates words, e.g. "lower_back" -> "Lower Back"
export function formatFilterLabel(value: string): string {
  return value
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// search filters as one line, e.g. "Muscle: Biceps · Difficulty: Beginner"
export function formatSearchFilters(filters: ApiExerciseSearchFilters): string {
  const labels = [`Muscle: ${formatFilterLabel(filters.muscle)}`];
  if (filters.name) labels.push(`Name: ${filters.name}`);
  if (filters.type) labels.push(`Type: ${formatFilterLabel(filters.type)}`);
  if (filters.difficulty) {
    labels.push(`Difficulty: ${formatFilterLabel(filters.difficulty)}`);
  }
  return labels.join(' · ');
}

// a missing api detail (added incomplete by the user) is shown as "Not Specified"
export function formatDetailLabel(
  value: string | null,
  format: (value: string) => string
): string {
  return value === null ? 'Not Specified' : format(value);
}

export function formatEquipmentsLabel(equipments: string[] | null): string {
  return formatDetailLabel(
    equipments === null ? null : equipments.map(formatFilterLabel).join(', '),
    (label) => label
  );
}
