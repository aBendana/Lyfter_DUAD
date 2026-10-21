import type { DayRoutineType } from '../../types/routineTypes';
import { generateRecommendations } from '../../utils/generateRecommendations';

export function Recommendations({
  routineEntries,
}: {
  routineEntries: DayRoutineType[];
}) {
  const recommendations = generateRecommendations(routineEntries);

  return (
    <div className="recommendations">
      <h2>Recommendations</h2>
      <ul className="recommendations__list">
        <li className="recommendations__item">{recommendations}</li>
      </ul>
    </div>
  );
}
