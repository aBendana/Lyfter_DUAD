import { useState } from 'react';
import { ApiError } from '../../services/apiErrors';
import { fetchExercisesByMuscle } from '../../services/fetchExercisesByMuscle';
import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import { NinjaSearchForm } from '../../components/Forms/NinjaSearchForm/NinjaSearchForm';
import type { NinjaSearchFormValues } from '../../components/Forms/NinjaSearchForm/NinjaSearchForm';
import { IncompleteExerciseItem } from '../../components/IncompleteExerciseItem/IncompleteExerciseItem';
import { SearchHistory } from '../../components/SearchHistory/SearchHistory';
import { exerciseNameCategories } from '../../types/exerciseCatalog';
import type {
  ApiExerciseReportType,
  ApiExerciseSearchFilters,
  ApiExerciseType,
} from '../../types/apiExerciseTypes';
import {
  formatDetailLabel,
  formatEquipmentsLabel,
  formatFilterLabel,
  formatSearchFilters,
} from '../../utils/normalizeExercise';
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

const emptyFormValues: NinjaSearchFormValues = {
  muscle: '',
  name: '',
  type: '',
  difficulty: '',
};

// form values -> api filters: empty optional fields are left out
function toSearchFilters(values: NinjaSearchFormValues): ApiExerciseSearchFilters {
  const name = values.name.trim();
  return {
    muscle: values.muscle.trim(),
    ...(name ? { name } : {}),
    ...(values.type ? { type: values.type } : {}),
    ...(values.difficulty ? { difficulty: values.difficulty } : {}),
  };
}

// api filters -> form values, used by "Search again"
function toFormValues(filters: ApiExerciseSearchFilters): NinjaSearchFormValues {
  return {
    muscle: filters.muscle,
    name: filters.name ?? '',
    type: filters.type ?? '',
    difficulty: filters.difficulty ?? '',
  };
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

function formatExerciseCount(count: number): string {
  return `${count} ${count === 1 ? 'exercise' : 'exercises'}`;
}

export function NinjaExercises() {
  const {
    addExercise,
    addIncompleteExercises,
    getExerciseCounts,
    hasExercise,
    getIncompleteExerciseStatus,
    searchHistory,
    addSearchToHistory,
    clearSearchHistory,
  } = useExerciseCatalog();
  const [formValues, setFormValues] =
    useState<NinjaSearchFormValues>(emptyFormValues);
  const [searchState, setSearchState] = useState<SearchState>({
    status: 'idle',
  });
  // pending and added ones stay listed; only discarded ones are hidden
  const visibleIncompleteExercises =
    searchState.status === 'success'
      ? searchState.report.incomplete.filter(
          (exercise) => getIncompleteExerciseStatus(exercise) !== 'discarded'
        )
      : [];

  // shared by the form and "Search again" in the history
  const runSearch = async (requestedFilters: ApiExerciseSearchFilters) => {
    if (searchState.status === 'loading') return;

    if (!requestedFilters.muscle) {
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
      const report = validateApiExercises(rawExercises);
      addIncompleteExercises(report.incomplete);
      // only successful searches go to the history
      addSearchToHistory({
        filters: requestedFilters,
        searchedAt: new Date(),
        validCount: report.valid.length,
        incompleteCount: report.incomplete.length,
      });
      setSearchState({
        status: 'success',
        filters: requestedFilters,
        report,
      });
    } catch (error) {
      setSearchState({
        status: 'error',
        filters: requestedFilters,
        message: getSearchErrorMessage(error),
      });
    }
  };

  const handleSearch = async () => {
    await runSearch(toSearchFilters(formValues));
  };

  // fills the form with the saved filters, then searches with them
  const handleSearchAgain = async (filters: ApiExerciseSearchFilters) => {
    setFormValues(toFormValues(filters));
    await runSearch(filters);
  };

  return (
    <section className="ninja-exercises">
      <header className="ninja-exercises__header">
        <p className="ninja-exercises__eyebrow">External exercise catalog</p>
        <h2>Ninja Exercises</h2>
        <p>Search by muscle and optionally narrow results by name, type, or difficulty.</p>
      </header>

      <NinjaSearchForm
        values={formValues}
        onChange={setFormValues}
        onSearch={handleSearch}
        isSearching={searchState.status === 'loading'}
      />

      <SearchHistory
        history={searchHistory}
        onSearchAgain={handleSearchAgain}
        onClear={clearSearchHistory}
        disabled={searchState.status === 'loading'}
      />

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
              Filters: <strong>{formatSearchFilters(searchState.filters)}</strong>
            </p>
          </header>

          <section
            className="ninja-exercises__group"
            aria-labelledby="ninja-exercises-valid-heading"
          >
            <h4 id="ninja-exercises-valid-heading">
              Exercises (
              {searchState.report.valid.length +
                visibleIncompleteExercises.length}
              )
            </h4>
            {searchState.report.valid.length > 0 ||
            visibleIncompleteExercises.length > 0 ? (
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
                      <span>
                        {getCategoryLabel(exercise)} ·{' '}
                        {formatDetailLabel(exercise.muscle, formatFilterLabel)}{' '}
                        ·{' '}
                        {formatDetailLabel(
                          exercise.difficulty,
                          formatFilterLabel
                        )}{' '}
                        ·{' '}
                        {formatEquipmentsLabel(exercise.equipments)}
                      </span>
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
                {visibleIncompleteExercises.map((exercise, index) => (
                  <IncompleteExerciseItem
                    exercise={exercise}
                    key={`${JSON.stringify(exercise.raw)}-${index}`}
                  />
                ))}
              </ul>
            ) : (
              <p className="ninja-exercises__empty">
                No exercises to show for this search.
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
