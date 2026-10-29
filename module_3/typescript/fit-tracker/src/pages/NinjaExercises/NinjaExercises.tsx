import { useState } from 'react';
import type { FormEvent } from 'react';
import { ApiError } from '../../services/apiErrors';
import { fetchExercisesByMuscle } from '../../services/fetchExercisesByMuscle';
import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import { apiMuscles, exerciseNameCategories } from '../../types/exerciseCatalog';
import type {
  ApiExerciseDifficulty,
  ApiExerciseReportType,
  ApiExerciseSearchFilters,
  ApiExerciseSearchType,
  ApiExerciseType,
  IncompleteApiExerciseType,
} from '../../types/apiExerciseTypes';
import { validateApiExercises } from '../../utils/validateApiExercises';
import './NinjaExercises.css';

type SearchState =
  | { status: 'idle' }
  | { status: 'loading'; filters: ApiExerciseSearchFilters }
  | {
      status: 'success';
      filters: ApiExerciseSearchFilters;
      report: ApiExerciseReportType;
    }
  | {
      status: 'error';
      filters: ApiExerciseSearchFilters;
      message: string;
    };

const exerciseTypes: readonly ApiExerciseSearchType[] = [
  'cardio',
  'olympic_weightlifting',
  'plyometrics',
  'powerlifting',
  'strength',
  'stretching',
  'strongman',
];

const exerciseDifficulties: readonly ApiExerciseDifficulty[] = [
  'beginner',
  'intermediate',
  'expert',
];

function isExerciseSearchType(value: string): value is ApiExerciseSearchType {
  return exerciseTypes.some((exerciseType) => exerciseType === value);
}

function isExerciseDifficulty(
  value: string
): value is ApiExerciseDifficulty {
  return exerciseDifficulties.some((difficulty) => difficulty === value);
}

function getIncompleteExerciseName(
  incompleteExercise: IncompleteApiExerciseType
): string {
  const { raw } = incompleteExercise;
  if (
    typeof raw === 'object' &&
    raw !== null &&
    !Array.isArray(raw) &&
    'name' in raw &&
    typeof raw.name === 'string' &&
    raw.name.trim() !== ''
  ) {
    return raw.name.trim();
  }

  return 'Unnamed exercise';
}

function getCategoryLabel(exercise: ApiExerciseType): string {
  switch (exercise.category) {
    case 'cardio':
      return 'Cardio';
    case 'strength':
      return 'Strength';
    case 'flexibility':
      return 'Flexibility';
  }
}

function getSearchErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.kind) {
      case 'config':
        return 'The exercises API key is missing. Set VITE_API_NINJAS_KEY in .env.local and restart the app.';
      case 'network':
        return 'Could not reach the exercises service. Check your connection and try again.';
      case 'http':
        return `The exercises service returned an error${error.status ? ` (${error.status})` : ''}. Try again later.`;
      case 'invalid-json':
        return 'The exercises service returned an unreadable response. Try again later.';
    }
  }

  if (error instanceof Error) {
    console.error('Unexpected error while searching Ninja exercises:', error);
    return `An unexpected error occurred: ${error.message}`;
  }

  console.error('Unexpected error while searching Ninja exercises:', error);
  return 'An unexpected error occurred while searching exercises.';
}

function formatMuscleLabel(value: string): string {
  const label = value.replace('_', ' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatFilterLabel(value: string): string {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatExerciseCount(count: number): string {
  return `${count} ${count === 1 ? 'exercise' : 'exercises'}`;
}

export function NinjaExercises() {
  const { addExercise, getExerciseCounts, hasExercise } = useExerciseCatalog();
  const [muscle, setMuscle] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<ApiExerciseSearchType | ''>('');
  const [difficulty, setDifficulty] = useState<ApiExerciseDifficulty | ''>('');
  const [searchState, setSearchState] = useState<SearchState>({
    status: 'idle',
  });

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchState.status === 'loading') return;

    const requestedMuscle = muscle.trim();
    const requestedFilters: ApiExerciseSearchFilters = {
      muscle: requestedMuscle,
      ...(name.trim() ? { name: name.trim() } : {}),
      ...(type ? { type } : {}),
      ...(difficulty ? { difficulty } : {}),
    };
    if (!requestedMuscle) {
      setSearchState({
        status: 'error',
        filters: requestedFilters,
        message: 'Select a muscle group to search for.',
      });
      return;
    }

    setSearchState({ status: 'loading', filters: requestedFilters });

    try {
      const rawExercises = await fetchExercisesByMuscle(requestedFilters);
      setSearchState({
        status: 'success',
        filters: requestedFilters,
        report: validateApiExercises(rawExercises),
      });
    } catch (error) {
      setSearchState({
        status: 'error',
        filters: requestedFilters,
        message: getSearchErrorMessage(error),
      });
    }
  };

  return (
    <section className="ninja-exercises">
      <header className="ninja-exercises__header">
        <p className="ninja-exercises__eyebrow">External exercise catalog</p>
        <h2>Ninja Exercises</h2>
        <p>Search by muscle and optionally narrow results by name, type, or difficulty.</p>
      </header>

      <form className="ninja-exercises__search" onSubmit={handleSearch}>
        <div className="ninja-exercises__search-controls">
          <label htmlFor="ninja-exercises-muscle">
            Muscle group
            <select
              id="ninja-exercises-muscle"
              name="muscle"
              value={muscle}
              onChange={(event) => setMuscle(event.target.value)}
              required
            >
              <option value="">Select a muscle group</option>
              {apiMuscles.map((apiMuscle) => (
                <option key={apiMuscle} value={apiMuscle}>
                  {formatMuscleLabel(apiMuscle)}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="ninja-exercises-name">
            Exercise name (optional)
            <input
              id="ninja-exercises-name"
              name="name"
              type="search"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. bench press"
            />
          </label>
          <label htmlFor="ninja-exercises-type">
            Exercise type (optional)
            <select
              id="ninja-exercises-type"
              name="type"
              value={type}
              onChange={(event) => {
                const value = event.target.value;
                setType(isExerciseSearchType(value) ? value : '');
              }}
            >
              <option value="">Any type</option>
              {exerciseTypes.map((exerciseType) => (
                <option key={exerciseType} value={exerciseType}>
                  {formatFilterLabel(exerciseType)}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="ninja-exercises-difficulty">
            Difficulty (optional)
            <select
              id="ninja-exercises-difficulty"
              name="difficulty"
              value={difficulty}
              onChange={(event) => {
                const value = event.target.value;
                setDifficulty(isExerciseDifficulty(value) ? value : '');
              }}
            >
              <option value="">Any difficulty</option>
              {exerciseDifficulties.map((exerciseDifficulty) => (
                <option key={exerciseDifficulty} value={exerciseDifficulty}>
                  {formatFilterLabel(exerciseDifficulty)}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={searchState.status === 'loading'}>
            {searchState.status === 'loading' ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {searchState.status === 'error' && (
        <p className="ninja-exercises__error" role="alert">
          {searchState.message}
        </p>
      )}

      {searchState.status === 'loading' && (
        <p className="ninja-exercises__loading" role="status">
          Searching exercises...
        </p>
      )}

      {searchState.status === 'idle' && (
        <p className="ninja-exercises__empty">
          Select a muscle group to search for exercises.
        </p>
      )}

      {searchState.status === 'success' && (
        <div className="ninja-exercises__results" aria-live="polite">
          <header className="ninja-exercises__results-header">
            <h3>Search Results</h3>
            <p>
              Filters:{' '}
              <strong>
                {[
                  `Muscle: ${formatMuscleLabel(searchState.filters.muscle)}`,
                  searchState.filters.name
                    ? `Name: ${searchState.filters.name}`
                    : null,
                  searchState.filters.type
                    ? `Type: ${formatFilterLabel(searchState.filters.type)}`
                    : null,
                  searchState.filters.difficulty
                    ? `Difficulty: ${formatFilterLabel(searchState.filters.difficulty)}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </strong>
            </p>
          </header>

          {searchState.report.valid.length === 0 &&
            searchState.report.incomplete.length === 0 && (
              <p className="ninja-exercises__empty">
                No exercises were returned for this muscle.
              </p>
            )}

          <section
            className="ninja-exercises__group"
            aria-labelledby="ninja-exercises-valid-heading"
          >
            <h4 id="ninja-exercises-valid-heading">
              Validated Exercises ({searchState.report.valid.length})
            </h4>
            {searchState.report.valid.length > 0 ? (
              <ul className="ninja-exercises__list">
                {searchState.report.valid.map((exercise, index) => {
                  const alreadyInCatalog = hasExercise(
                    exercise.category,
                    exercise.name
                  );

                  return (
                    <li
                      className="ninja-exercises__item"
                      key={`${exercise.name}-${exercise.category}-${index}`}
                    >
                      <strong>{exercise.name}</strong>
                      <span>{getCategoryLabel(exercise)}</span>
                      <button
                        className="ninja-exercises__add"
                        type="button"
                        disabled={alreadyInCatalog}
                        onClick={() => addExercise(exercise)}
                      >
                        {alreadyInCatalog ? 'In catalog' : 'Add to catalog'}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="ninja-exercises__empty">
                No validated exercises found.
              </p>
            )}
          </section>

          <section
            className="ninja-exercises__group"
            aria-labelledby="ninja-exercises-incomplete-heading"
          >
            <h4 id="ninja-exercises-incomplete-heading">
              Incomplete Data ({searchState.report.incomplete.length})
            </h4>
            {searchState.report.incomplete.length > 0 ? (
              <ul className="ninja-exercises__list">
                {searchState.report.incomplete.map((exercise, index) => (
                  <li
                    className="ninja-exercises__item ninja-exercises__item--incomplete"
                    key={`${getIncompleteExerciseName(exercise)}-${index}`}
                  >
                    <strong>{getIncompleteExerciseName(exercise)}</strong>
                    <span>{exercise.reasons.join('; ')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ninja-exercises__empty">
                No incomplete exercises found.
              </p>
            )}
          </section>
        </div>
      )}

      <section
        className="ninja-exercises__catalog-summary"
        aria-labelledby="ninja-exercises-catalog-heading"
      >
        <h3 id="ninja-exercises-catalog-heading">Exercise Catalog</h3>
        <div className="ninja-exercises__catalog-table-wrapper">
          <table className="ninja-exercises__catalog-table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Local Catalog</th>
                <th scope="col">Ninja Catalog</th>
              </tr>
            </thead>
            <tbody>
              {exerciseNameCategories.map((category) => {
                const counts = getExerciseCounts(category);

                return (
                  <tr key={category}>
                    <th scope="row">{category}</th>
                    <td>{formatExerciseCount(counts.local)}</td>
                    <td>
                      {counts.ninja > 0
                        ? formatExerciseCount(counts.ninja)
                        : 'No Added'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
