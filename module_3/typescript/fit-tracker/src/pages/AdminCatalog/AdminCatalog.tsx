import { AdminPageHeader } from '../../components/AdminPageHeader/AdminPageHeader';
import { ExportButton } from '../../components/ExportButton/ExportButton';
import { StatTiles } from '../../components/StatTiles/StatTiles';
import { useStore } from '../../hooks/useStore';
import { exerciseCatalogStore } from '../../store/stores';
import { exerciseNameCategories } from '../../types/exerciseCatalog';
import type { ExerciseCategoryType } from '../../types/exerciseTypes';
import type { StatTileType } from '../../types/statTileTypes';
import { generateCatalogExport } from '../../utils/generateCatalogExport';
import { getCatalogExerciseCategory } from '../../utils/getCatalogExerciseCategory';
import { isApiCatalogExercise } from '../../utils/typeGuards';
import './AdminCatalog.css';

const categoryIcons: Record<ExerciseCategoryType, string> = {
  Cardio: '🏃',
  Strength: '💪',
  Flexibility: '🧘',
};

export function AdminCatalog() {
  const catalog = useStore(exerciseCatalogStore);
  const apiCount = catalog.filter(isApiCatalogExercise).length;

  // one custom criterion per category, answered by the store
  const categories = exerciseNameCategories.map((category) => {
    const exercises = exerciseCatalogStore.findBy(
      (exercise) => getCatalogExerciseCategory(exercise) === category
    );
    const api = exercises.filter(isApiCatalogExercise).length;
    return { category, exercises, local: exercises.length - api, api };
  });

  const sourceTiles: StatTileType[] = [
    { label: 'Total exercises', value: catalog.length },
    { label: 'Local', value: catalog.length - apiCount },
    { label: 'Ninja', value: apiCount },
  ];

  const categoryTiles: StatTileType[] = categories.map(
    ({ category, exercises, local, api }) => ({
      label: `${categoryIcons[category]} ${category}`,
      value: exercises.length,
      detail: `${local} local + ${api} Ninja`,
    })
  );

  return (
    <section className="admin-catalog">
      <AdminPageHeader
        title="Exercise catalog"
        description="Local exercises and API Ninja exercises."
      />

      <StatTiles tiles={sourceTiles} label="Catalog by source" />
      <StatTiles tiles={categoryTiles} label="Catalog by category" />

      <div className="admin-catalog__categories">
        {categories.map(({ category, exercises }) => (
          <section
            className="admin-catalog__category"
            aria-labelledby={`admin-catalog-${category}`}
            key={category}
          >
            <h3 id={`admin-catalog-${category}`}>
              {categoryIcons[category]} {category}
            </h3>
            <ul className="admin-catalog__exercises">
              {exercises.map((exercise) => (
                <li
                  className={`admin-catalog__exercise admin-catalog__exercise--${exercise.source}`}
                  key={exercise.id}
                >
                  {exercise.name}
                  {exercise.source === 'api' && ' (Ninja)'}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ExportButton
        section="catalog"
        label="Export Catalog"
        createFile={() => generateCatalogExport(catalog)}
        disabled={catalog.length === 0}
      />
    </section>
  );
}
