import { logActivity } from '../../store/logActivity';
import type {
  ExportFileType,
  ExportSectionType,
} from '../../types/exportTypes';
import type { EntityType } from '../../types/storeTypes';
import { downloadJson } from '../../utils/downloadJson';
import { generateExportFileName } from '../../utils/generateExportFileName';
import './ExportButton.css';

interface ExportButtonProps<T extends EntityType> {
  section: ExportSectionType;
  label: string;
  // built on click, so the file holds the data of that moment
  createFile: () => ExportFileType<T>;
  disabled: boolean;
}

// one button for every admin export, whatever entity the file carries
export function ExportButton<T extends EntityType>({
  section,
  label,
  createFile,
  disabled,
}: ExportButtonProps<T>) {
  const handleExport = () => {
    const file = createFile();
    downloadJson(generateExportFileName(section, file.exportedAt), file);
    logActivity({ kind: 'data-exported', section, count: file.count });
  };

  return (
    <div className="export-button">
      <button
        className="export-button__button"
        type="button"
        onClick={handleExport}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
