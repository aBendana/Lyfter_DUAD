import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import type { IncompleteApiExerciseType } from '../../types/apiExerciseTypes';
import { getRawExerciseName } from '../../utils/normalizeExercise';
import { acceptIncompleteApiExercise } from '../../utils/validateApiExercises';

export function IncompleteExerciseItem({
  exercise,
}: {
  exercise: IncompleteApiExerciseType;
}) {
  const {
    addExercise,
    getIncompleteExerciseStatus,
    hasExercise,
    resolveIncompleteExercise,
  } = useExerciseCatalog();
  const rawName = getRawExerciseName(exercise.raw);
  const acceptedExercise = acceptIncompleteApiExercise(exercise.raw);
  const wasAdded = getIncompleteExerciseStatus(exercise) === 'added';
  const alreadyInCatalog =
    acceptedExercise !== null &&
    hasExercise(acceptedExercise.category, acceptedExercise.name);

  const handleAdd = () => {
    if (acceptedExercise === null || alreadyInCatalog) return;

    addExercise(acceptedExercise);
    resolveIncompleteExercise(exercise, 'added');
  };

  const getAddLabel = (): string => {
    if (acceptedExercise === null) return 'Needs name and type';
    return alreadyInCatalog ? 'In catalog' : 'Add';
  };

  return (
    <li className="ninja-exercises__item ninja-exercises__item--incomplete">
      <strong>
        {rawName || 'Unnamed exercise'} <em>(incomplete)</em>
      </strong>
      <span>{exercise.reasons.join('; ')}</span>

      <div className="ninja-exercises__item-actions">
        <button
          className="ninja-exercises__add"
          type="button"
          disabled={acceptedExercise === null || alreadyInCatalog}
          onClick={handleAdd}
        >
          {getAddLabel()}
        </button>
        {/* once added, it stays listed like a complete exercise in the catalog */}
        {!wasAdded && (
          <button
            className="ninja-exercises__add"
            type="button"
            onClick={() => resolveIncompleteExercise(exercise, 'discarded')}
          >
            Discard
          </button>
        )}
      </div>
    </li>
  );
}
