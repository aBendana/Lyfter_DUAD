import { AdminPageHeader } from '../../components/AdminPageHeader/AdminPageHeader';
import { MembersResume } from '../../components/MembersResume/MembersResume';
import { StatTiles } from '../../components/StatTiles/StatTiles';
import { useExerciseCatalog } from '../../hooks/useExerciseCatalog';
import { useStore } from '../../hooks/useStore';
import { instructorStore, memberStore, routineStore } from '../../store/stores';
import type { StatTileType } from '../../types/statTileTypes';
import { isActiveRoutine } from '../../utils/isActiveRoutine';
import './AdminOverview.css';

export function AdminOverview() {
  // subscribed, so the counts follow every write to the stores
  const members = useStore(memberStore);
  const instructors = useStore(instructorStore);
  const routines = useStore(routineStore);
  const { getExerciseCounts } = useExerciseCatalog();
  const catalogCounts = getExerciseCounts();
  // routines are counted on their own store, without going through members
  const activeRoutines = routineStore.findBy(isActiveRoutine).length;

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
      detail: 'With at least one workout session',
    },
  ];

  return (
    <section className="admin-overview">
      <AdminPageHeader
        title="System overview"
        description="General Status in Fit Tracker."
      />
      <StatTiles tiles={tiles} label="System counts" />
      <MembersResume members={members} routines={routines} />
    </section>
  );
}
