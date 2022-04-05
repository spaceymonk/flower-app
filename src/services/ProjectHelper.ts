import { Block, BlockTypes, ProjectData } from '../types';
import { nameof, throwErrorIfNull, throwErrorIfUndefined } from '../util';
import { ProjectDataSchema } from '../config/ProjectDataValidation';
import { toast } from 'react-toastify';
import InitialValues from '../config/InitialValues';
import FileSaver from 'file-saver';
import domtoimage from 'dom-to-image';
import { includesBlock } from './BlockHelper';
import { validateFlow } from './FlowParser';
import { getOutgoers } from 'react-flow-renderer';

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
  let code = '';

  const visited: Block[] = [];
  const stack: Block[] = [validateFlow(pd.blocks, pd.edges)];
  while (stack.length !== 0) {
    const iter: Block = throwErrorIfUndefined(stack.pop());
    if (!includesBlock(visited, iter)) {
      visited.push(iter);

      if (iter.type === BlockTypes.START_BLOCK) {
        code += `begin ${pd.title}\n`;
      } else if (iter.type === BlockTypes.STOP_BLOCK) {
        code += 'end\n';
      } else if (iter.type === BlockTypes.LOAD_BLOCK) {
        code += `  load ${iter.data.text}\n`;
      } else if (iter.type === BlockTypes.STORE_BLOCK) {
        code += `  store ${iter.data.text}\n`;
      } else if (iter.type === BlockTypes.STATEMENT_BLOCK) {
        code += `  ${iter.data.text}\n`;
      } else {
        //todo: add branching logic
        throw new Error('Unsupported block type: ' + iter.type);
      }
      const outgoers: Block[] = getOutgoers(iter, pd.blocks, pd.edges);
      stack.push(...outgoers);
    }
  }

  return code;
};
