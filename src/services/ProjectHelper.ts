import { Block, BlockTypes, DecisionBlockHandle, ProjectData } from '../types';
import { nameof, throwErrorIfNull } from '../util';
import { ProjectDataSchema } from '../config/ProjectDataValidation';
import { toast } from 'react-toastify';
import InitialValues from '../config/InitialValues';
import FileSaver from 'file-saver';
import domtoimage from 'dom-to-image';
import { mapDecisionPaths, PathMapping, validateFlow } from './FlowParser';
import { getConnectedEdges, getOutgoers } from 'react-flow-renderer';

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

type Scope = { scopeof: string; end: string };
export const toCode = (pd: ProjectData) => {
  const [startBlock, stopBlock] = validateFlow(pd.blocks, pd.edges);
  const stack: Block[] = [startBlock];
  let mapping: PathMapping = {};
  let scope: Scope[] = [];
  let code = '';

  while (stack.length !== 0) {
    const iter: Block = stack.pop() as Block;
    const outgoers: Block[] = getOutgoers(iter, pd.blocks, pd.edges);

    if (scope.at(-1)?.end === iter.id) {
      let currentScope = scope.pop() as Scope;

      while (currentScope.scopeof === 'else') {
        currentScope = scope.pop() as Scope;
      }

      if (currentScope.scopeof === BlockTypes.DECISION_BLOCK) {
        if (stack.at(-1)?.id !== currentScope.end) {
          code += `${'  '.repeat(scope.length)}else\n`;
          scope.push({ scopeof: 'else', end: currentScope.end });
        }
        continue;
      } else if (currentScope.scopeof === BlockTypes.WHILE_LOOP_BLOCK) {
        continue;
      }
    }

    if (iter.type === BlockTypes.START_BLOCK) {
      code += 'begin\n';
      scope.push({ scopeof: iter.type, end: stopBlock.id });
      stack.push(outgoers[0]);
    } else if (iter.type === BlockTypes.STOP_BLOCK) {
      code += 'end\n';
      break;
    } else if (iter.type === BlockTypes.LOAD_BLOCK) {
      code += `${'  '.repeat(scope.length)}load ${iter.data.text}\n`;
      stack.push(outgoers[0]);
    } else if (iter.type === BlockTypes.STORE_BLOCK) {
      code += `${'  '.repeat(scope.length)}store ${iter.data.text}\n`;
      stack.push(outgoers[0]);
    } else if (iter.type === BlockTypes.STATEMENT_BLOCK) {
      code += `${'  '.repeat(scope.length)}${iter.data.text}\n`;
      stack.push(outgoers[0]);
    } else if (iter.type === BlockTypes.WHILE_LOOP_BLOCK) {
      code += `${'  '.repeat(scope.length)}while (${iter.data.text})\n`;
      scope.push({ scopeof: iter.type, end: iter.id });
      if (outgoers[0].parentNode === iter.id) {
        stack.push(outgoers[1], outgoers[0]);
      } else {
        stack.push(outgoers[0], outgoers[1]);
      }
    } else if (iter.type === BlockTypes.DECISION_BLOCK) {
      code += `${'  '.repeat(scope.length)}if (${iter.data.text})\n`;
      let falseBlockId = null;
      const connectedEdgeList = getConnectedEdges([iter], pd.edges);
      for (const edge of connectedEdgeList) {
        if (edge.sourceHandle === DecisionBlockHandle.FALSE) falseBlockId = edge.target;
      }
      if (falseBlockId === outgoers[0].id) {
        stack.push(outgoers[0], outgoers[1]);
      } else {
        stack.push(outgoers[1], outgoers[0]);
      }
      if (!mapping[iter.id]) mapDecisionPaths(iter, pd.blocks, pd.edges, mapping);
      scope.push({ scopeof: iter.type, end: mapping[iter.id].id });
    } else {
      throw new Error('Unsupported block type: ' + iter.type);
    }
  }

  return code;
};
