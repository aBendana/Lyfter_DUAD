import { ApiError } from './apiErrors';
import type { ApiExerciseSearchFilters } from '../types/apiExerciseTypes';

const ENDPOINT = 'https://api.api-ninjas.com/v1/exercises';

// returns the raw (unknown) payload; it must go through validateApiExercises before use
export async function fetchExercisesByMuscle(
  filters: ApiExerciseSearchFilters
): Promise<unknown> {
  const apiKey = import.meta.env.VITE_API_NINJAS_KEY;
  if (!apiKey) {
    throw new ApiError(
      'config',
      'Missing VITE_API_NINJAS_KEY environment variable'
    );
  }

  // search by muscle, and optionally by name, type, and difficulty
  // search by muscle is always required
  const params = new URLSearchParams({ muscle: filters.muscle.trim() });
  const name = filters.name?.trim();
  if (name) params.set('name', name);
  if (filters.type) params.set('type', filters.type);
  if (filters.difficulty) params.set('difficulty', filters.difficulty);

  const url = `${ENDPOINT}?${params.toString()}`;

  let response: Response;
  try {
    response = await fetch(url, { headers: { 'X-Api-Key': apiKey } });
  } catch {
    throw new ApiError('network', 'Could not reach the exercises service');
  }

  if (!response.ok) {
    throw new ApiError(
      'http',
      `Exercises service responded with ${response.status}`,
      response.status
    );
  }

  try {
    // json() returns any; assigning it to unknown needs no conversion
    const data: unknown = await response.json();
    return data;
  } catch {
    throw new ApiError(
      'invalid-json',
      'Exercises service returned invalid JSON'
    );
  }
}
