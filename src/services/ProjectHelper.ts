import { ProjectData } from '../types';
import { nameof, throwErrorIfNull } from '../util';
import { ProjectDataSchema } from '../config/ProjectDataValidation';
import { toast } from 'react-toastify';
import InitialValues from '../config/InitialValues';
import FileSaver from 'file-saver';
import domtoimage from 'dom-to-image';

/* -------------------------------------------------------------------------- */
/*                                    load                                    */
/* -------------------------------------------------------------------------- */
export const load = (pd: ProjectData, setters: any) => {
  setters.setEdges(pd.edges);
  setters.setBlocks(pd.blocks);
  setters.setTitle(pd.title);
  setters.setInputParams(pd.inputParams);
};

/* -------------------------------------------------------------------------- */
/*                                    save                                    */
/* -------------------------------------------------------------------------- */
export const save = (pd: ProjectData) => {
  window.localStorage.clear();
  window.localStorage.setItem(nameof<ProjectData>('blocks'), JSON.stringify(pd.blocks));
  window.localStorage.setItem(nameof<ProjectData>('edges'), JSON.stringify(pd.edges));
  window.localStorage.setItem(nameof<ProjectData>('title'), pd.title);
  window.localStorage.setItem(nameof<ProjectData>('inputParams'), pd.inputParams);
  InitialValues.refresh();
};

/* -------------------------------------------------------------------------- */
/*                                  download                                  */
/* -------------------------------------------------------------------------- */
export const download = (pd: ProjectData) => {
  const blob = new Blob([JSON.stringify(pd, null, 2)], { type: 'application/json' });
  FileSaver.saveAs(blob, pd.title + '.json');
};

/* -------------------------------------------------------------------------- */
/*                                    toPNG                                   */
/* -------------------------------------------------------------------------- */
export const toPNG = async (title: string) => {
  const blob = await domtoimage.toBlob(throwErrorIfNull(document.getElementById('board')), { bgcolor: '#fff' });
  FileSaver.saveAs(blob, title + '.png');
};

/* -------------------------------------------------------------------------- */
/*                                    open                                    */
/* -------------------------------------------------------------------------- */
export const open = (file: Blob, onOpen?: (content: ProjectData) => void) => {
  const fileReader = new FileReader();
  const handleFileRead = () => {
    try {
      const content: ProjectData = JSON.parse(throwErrorIfNull(fileReader.result));
      const result = ProjectDataSchema.validate(content);
      if (result.error) {
        throw new Error(result.error.message);
      }
      if (onOpen) onOpen(content);
    } catch (e: any) {
      toast.error('Invalid project file: ' + e.message);
    }
  };
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);
};

/* -------------------------------------------------------------------------- */
/*                                   toCode                                   */
/* -------------------------------------------------------------------------- */
export const toCode = (pd: ProjectData) => {
  // todo
  const blob = new Blob([JSON.stringify(pd, null, 2)], { type: 'application/json' });
  FileSaver.saveAs(blob, pd.title + '.json');
};
