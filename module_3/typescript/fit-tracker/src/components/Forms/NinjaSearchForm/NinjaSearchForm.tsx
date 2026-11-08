import type { FormEvent } from 'react';
import type {
  ApiExerciseDifficulty,
  ApiExerciseSearchType,
} from '../../../types/apiExerciseTypes';
import {
  apiMuscles,
  exerciseDifficulties,
  exerciseSearchTypes,
} from '../../../types/exerciseCatalog';
import { formatFilterLabel } from '../../../utils/normalizeExercise';
import {
  isExerciseDifficulty,
  isExerciseSearchType,
} from '../../../utils/typeGuards';
import './NinjaSearchForm.css';

// '' is used as the placeholder of each select: no muscle chosen yet,
// or "any" type / difficulty
export interface NinjaSearchFormValues {
  muscle: string;
  name: string;
  type: ApiExerciseSearchType | '';
  difficulty: ApiExerciseDifficulty | '';
}

interface NinjaSearchFormProps {
  values: NinjaSearchFormValues;
  onChange: (values: NinjaSearchFormValues) => void;
  onSearch: () => void;
  isSearching: boolean;
}

// controlled form: the page owns the values, so "Search again" can fill it
export function NinjaSearchForm({
  values,
  onChange,
  onSearch,
  isSearching,
}: NinjaSearchFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="ninja-search-form" onSubmit={handleSubmit}>
      <div className="ninja-search-form__controls">
        <label htmlFor="ninja-search-muscle">
          Muscle group
          <select
            id="ninja-search-muscle"
            name="muscle"
            value={values.muscle}
            onChange={(event) =>
              onChange({ ...values, muscle: event.target.value })
            }
            required
          >
            <option value="">Select a muscle group</option>
            {apiMuscles.map((apiMuscle) => (
              <option key={apiMuscle} value={apiMuscle}>
                {formatFilterLabel(apiMuscle)}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="ninja-search-name">
          Exercise name (optional)
          <input
            id="ninja-search-name"
            name="name"
            type="search"
            value={values.name}
            onChange={(event) =>
              onChange({ ...values, name: event.target.value })
            }
            placeholder="e.g. bench press"
          />
        </label>

        <label htmlFor="ninja-search-type">
          Exercise type (optional)
          <select
            id="ninja-search-type"
            name="type"
            value={values.type}
            onChange={(event) => {
              const value = event.target.value;
              onChange({
                ...values,
                type: isExerciseSearchType(value) ? value : '',
              });
            }}
          >
            <option value="">Any type</option>
            {exerciseSearchTypes.map((searchType) => (
              <option key={searchType} value={searchType}>
                {formatFilterLabel(searchType)}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="ninja-search-difficulty">
          Difficulty (optional)
          <select
            id="ninja-search-difficulty"
            name="difficulty"
            value={values.difficulty}
            onChange={(event) => {
              const value = event.target.value;
              onChange({
                ...values,
                difficulty: isExerciseDifficulty(value) ? value : '',
              });
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

        <button type="submit" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
