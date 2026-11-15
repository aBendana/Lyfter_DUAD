import type { ExportSectionType } from '../types/exportTypes';

// local date, so an evening export is not named after tomorrow (utc)
export function generateExportFileName(
  section: ExportSectionType,
  date: Date
): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `fit-tracker-${section}-${year}-${month}-${day}.json`;
}
