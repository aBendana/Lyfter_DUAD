import type { ExportFileType } from '../types/exportTypes';
import type { EntityType } from '../types/storeTypes';

// copies the items, so the file never holds the store's own array
export function createExportFile<T extends EntityType>(
  items: readonly T[]
): ExportFileType<T> {
  return { exportedAt: new Date(), count: items.length, items: [...items] };
}
