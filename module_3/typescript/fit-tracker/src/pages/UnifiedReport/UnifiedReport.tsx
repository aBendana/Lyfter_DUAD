import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import { useWeeklyRoutine } from '../../hooks/useWeeklyRoutine';
import type { ApiExerciseDetailsType } from '../../types/apiExerciseTypes';
import type { ExerciseType } from '../../types/exerciseTypes';
import type { UnifiedReportIncompleteEntryType } from '../../types/unifiedReportTypes';
import {
  exerciseVolume,
  minutesToHoursAndMinutes,
} from '../../utils/calculations';
import { generateUnifiedReport } from '../../utils/generateUnifiedReport';
import {
  formatDetailLabel,
  formatEquipmentsLabel,
  formatFilterLabel,
} from '../../utils/normalizeExercise';
import './UnifiedReport.css';

// the specific data of each category
function getExerciseDetail(exercise: ExerciseType): string {
  switch (exercise.exerciseCategory) {
    case 'Cardio':
      return `Pace: ${exercise.pace} min/km`;
    case 'Strength': {
      const volume = exerciseVolume(
        exercise.sets,
        exercise.repetitions,
        exercise.weight
      );
      return `Volume: ${volume} ${exercise.weight ? 'lbs' : 'reps'}`;
    }
    case 'Flexibility':
      return `Positions: ${exercise.positions}`;
  }
}

// muscle, difficulty and equipments cells; local exercises have no api details
function ApiDetailsCells({
  details,
}: {
  details: ApiExerciseDetailsType | null;
}) {
  if (!details) {
    return (
      <>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </>
    );
  }

  return (
    <>
      <td>{formatDetailLabel(details.muscle, formatFilterLabel)}</td>
      <td>{formatDetailLabel(details.difficulty, formatFilterLabel)}</td>
      <td>{formatEquipmentsLabel(details.equipments)}</td>
    </>
  );
}

// category rows are a subset of the incomplete ones, so one row component serves both
function UnifiedReportRow({
  entry,
}: {
  entry: UnifiedReportIncompleteEntryType;
}) {
  switch (entry.status) {
    case 'logged':
      return (
        <tr>
          <th scope="row">{entry.exercise.name}</th>
          <td>{entry.exercise.source === 'ninja' ? 'Ninja' : 'Local'}</td>
          <td>{entry.day}</td>
          <td>{minutesToHoursAndMinutes(entry.exercise.duration)}</td>
          <td>{getExerciseDetail(entry.exercise)}</td>
          <ApiDetailsCells details={entry.details} />
        </tr>
      );
    case 'not-logged':
      return (
        <tr>
          <th scope="row">{entry.name}</th>
          <td>Ninja</td>
          <td colSpan={3}>Not logged yet</td>
          <ApiDetailsCells details={entry.details} />
        </tr>
      );
    case 'pending':
      return (
        <tr>
          <th scope="row">{entry.name}</th>
          <td>Ninja</td>
          <td colSpan={3}>Pending in Ninja Exercises</td>
          <ApiDetailsCells details={entry.details} />
        </tr>
      );
  }
}

function UnifiedReportTable({
  entries,
}: {
  entries: UnifiedReportIncompleteEntryType[];
}) {
  return (
    <div className="unified-report__table-wrapper">
      <table className="unified-report__table">
        <thead>
          <tr>
            <th scope="col">Exercise</th>
            <th scope="col">Source</th>
            <th scope="col">Day</th>
            <th scope="col">Time</th>
            <th scope="col">Details</th>
            <th scope="col">Muscle</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Equipment</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <UnifiedReportRow entry={entry} key={`${entry.status}-${index}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatTotals(exercises: number, minutes: number): string {
  return `${exercises} ${exercises === 1 ? 'exercise' : 'exercises'} · ${minutesToHoursAndMinutes(minutes)}`;
}

export function UnifiedReport() {
  const { officialEntries } = useWeeklyRoutine();
  const { addedExercises, incompleteExercises } = useExerciseCatalog();
  const report = generateUnifiedReport(
    officialEntries,
    addedExercises,
    incompleteExercises
  );

  return (
    <section className="unified-report">
      <header className="unified-report__header">
        <p className="unified-report__eyebrow">Local and Ninja exercises</p>
        <h1>Unified Report</h1>
      </header>

      <dl className="unified-report__totals">
        <div>
          <dt>Total exercises</dt>
          <dd>{report.totalExercises}</dd>
        </div>
        <div>
          <dt>Total time</dt>
          <dd>{minutesToHoursAndMinutes(report.totalMinutes)}</dd>
        </div>
      </dl>

      {report.categories.map(
        ({ category, entries, totalExercises, totalMinutes }) => (
          <section
            className="unified-report__panel"
            aria-labelledby={`unified-report-${category}`}
            key={category}
          >
            <div className="unified-report__panel-heading">
              <h2 id={`unified-report-${category}`}>{category}</h2>
              <p>{formatTotals(totalExercises, totalMinutes)}</p>
            </div>

            {entries.length > 0 ? (
              <UnifiedReportTable entries={entries} />
            ) : (
              <p className="unified-report__empty">
                No exercises in this category.
              </p>
            )}
          </section>
        )
      )}

      <section
        className="unified-report__panel unified-report__panel--incomplete"
        aria-labelledby="unified-report-incomplete"
      >
        <div className="unified-report__panel-heading">
          <h2 id="unified-report-incomplete">
            Ninja Exercises (Incomplete Info)
          </h2>
          <p>
            {formatTotals(report.incompleteExercises, report.incompleteMinutes)}{' '}
            (included in totals)
          </p>
        </div>

        {report.incomplete.length > 0 ? (
          <UnifiedReportTable entries={report.incomplete} />
        ) : (
          <p className="unified-report__empty">
            No Ninja exercises with incomplete info.
          </p>
        )}
      </section>
    </section>
  );
}
