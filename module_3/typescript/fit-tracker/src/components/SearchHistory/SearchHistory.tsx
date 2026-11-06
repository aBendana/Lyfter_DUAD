import type {
  ApiExerciseSearchFilters,
  SearchHistoryEntryType,
} from '../../types/apiExerciseTypes';
import { formatSearchFilters } from '../../utils/normalizeExercise';
import './SearchHistory.css';

interface SearchHistoryProps {
  history: SearchHistoryEntryType[];
  onSearchAgain: (filters: ApiExerciseSearchFilters) => void;
  onClear: () => void;
  // true while a search is running, so no second search starts
  disabled: boolean;
}

function formatSearchTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatSearchResults({
  validCount,
  incompleteCount,
}: SearchHistoryEntryType): string {
  const valid = `${validCount} valid`;
  return incompleteCount > 0 ? `${valid}, ${incompleteCount} incomplete` : valid;
}

// presentational: it receives the history and reports clicks; searching and
// storing belong to the page and the catalog context
export function SearchHistory({
  history,
  onSearchAgain,
  onClear,
  disabled,
}: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <section
      className="search-history"
      aria-labelledby="search-history-heading"
    >
      <div className="search-history__heading">
        <h3 id="search-history-heading">Recent searches</h3>
        <button
          className="search-history__button"
          type="button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <ul className="search-history__list">
        {history.map((entry) => (
          <li
            className="search-history__item"
            key={entry.searchedAt.getTime()}
          >
            <strong>{formatSearchFilters(entry.filters)}</strong>
            <span>
              {formatSearchTime(entry.searchedAt)} · {formatSearchResults(entry)}
            </span>
            <button
              className="search-history__button"
              type="button"
              disabled={disabled}
              onClick={() => onSearchAgain(entry.filters)}
            >
              Search again
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
