import type { CatalogExerciseType } from '../types/catalogExerciseTypes';
import type {
  CatalogExportFileType,
  CatalogExportItemType,
} from '../types/exportTypes';
import { createExportFile } from './createExportFile';
import { getCatalogExerciseCategory } from './getCatalogExerciseCategory';

function toCatalogExportItem(
  exercise: CatalogExerciseType
): CatalogExportItemType {
  const base = {
    id: exercise.id,
    name: exercise.name,
    category: getCatalogExerciseCategory(exercise),
  };

  if (exercise.source === 'local') return { ...base, source: 'local' };

  return {
    ...base,
    source: 'api',
    muscle: exercise.muscle,
    difficulty: exercise.difficulty,
    equipments: exercise.equipments,
  };
}

// counts by source and by category travel with the items
export function generateCatalogExport(
  catalog: readonly CatalogExerciseType[]
): CatalogExportFileType {
  const items = catalog.map(toCatalogExportItem);
  const countBy = (matches: (item: CatalogExportItemType) => boolean) =>
    items.filter(matches).length;

  return {
    ...createExportFile(items),
    summary: {
      local: countBy((item) => item.source === 'local'),
      api: countBy((item) => item.source === 'api'),
      Cardio: countBy((item) => item.category === 'Cardio'),
      Strength: countBy((item) => item.category === 'Strength'),
      Flexibility: countBy((item) => item.category === 'Flexibility'),
    },
  };
}
