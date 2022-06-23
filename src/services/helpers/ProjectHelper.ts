import FileSaver from 'file-saver';
import { toast } from 'react-toastify';
import LocalStorageManager from '../../config/LocalStorageManager';
import { ProjectDataSchema } from '../../config/ProjectDataValidation';
import { ProjectData } from '../../types';
import { nameof, throwErrorIfNull } from '../../util/common';
import { BlockCreateFactory } from './BlockHelper';
import { ConnectionCreateFactory } from './ConnectionHelper';

export function save(pd: ProjectData): void {
  window.localStorage.clear();
  window.localStorage.setItem(nameof<ProjectData>('blocks'), JSON.stringify(pd.blocks));
  window.localStorage.setItem(nameof<ProjectData>('connections'), JSON.stringify(pd.connections));
  window.localStorage.setItem(nameof<ProjectData>('title'), pd.title);
  window.localStorage.setItem(nameof<ProjectData>('inputParams'), pd.inputParams);
  LocalStorageManager.refresh();
}

export function download(pd: ProjectData): void {
  const blob = new Blob([JSON.stringify(pd, null, 2)], { type: 'application/json' });
  FileSaver.saveAs(blob, pd.title + '.json');
}

export function open(file: Blob, onOpen?: (content: ProjectData) => void): void {
  const fileReader = new FileReader();
  const handleFileRead = () => {
    try {
      const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result).toString());
      const result = ProjectDataSchema.validate(content);
      if (result.error) {
        throw new Error(result.error.message);
      }
      if (onOpen) {
        onOpen({
          title: content.title,
          blocks: content.blocks.map((b: any) => BlockCreateFactory.fromJSON(b)),
          connections: content.connections.map((c: any) => ConnectionCreateFactory.fromJSON(c)),
          inputParams: content.inputParams,
        });
      }
    } catch (e: any) {
      toast.error('Invalid project file: ' + e.message);
    }
  };
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);
}
