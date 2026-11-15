import { AdminPageHeader } from '../../components/AdminPageHeader/AdminPageHeader';
import { StatTiles } from '../../components/StatTiles/StatTiles';
import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import { useStore } from '../../hooks/useStore';
import { instructorStore, memberStore } from '../../store/stores';
import type { StatTileType } from '../../types/statTileTypes';
import { hasActiveRoutine } from '../../utils/hasActiveRoutine';
import './AdminOverview.css';

export function AdminOverview() {
  // subscribed, so the counts follow every write to the stores
  const members = useStore(memberStore);
  const instructors = useStore(instructorStore);
  const { getExerciseCounts } = useExerciseCatalog();
  const catalogCounts = getExerciseCounts();
  // the store answers the custom criterion; `members` only triggers the re-render
  const activeRoutines = memberStore.findBy(hasActiveRoutine).length;

  const tiles: StatTileType[] = [
    { label: 'Instructors', value: instructors.length },
    { label: 'Members', value: members.length },
    {
      label: 'Catalog exercises',
      value: catalogCounts.local + catalogCounts.api,
      detail: `${catalogCounts.local} local + ${catalogCounts.api} Ninja`,
    },
    {
      label: 'Active routines',
      value: activeRoutines,
      detail: 'With sessions and an active membership',
    },
  ];

  return (
    <section className="admin-overview">
      <AdminPageHeader
        title="System overview"
        description="General Status in Fit Tracker."
      />
      <StatTiles tiles={tiles} label="System counts" />
    </section>
  );
}
