import FileSaver from 'file-saver';
import { BlockTypes, DecisionBlockHandle, PathMapping } from '../../types';
import { throwErrorIfNull } from '../../util/common';
import { IExportService } from '../IExportService';
import domtoimage from 'dom-to-image';
import Block from '../../model/Block';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { IBlockService } from '../IBlockService';
import { IFlowService } from '../IFlowService';
import { IProjectService } from '../IProjectService';

export class ExportService implements IExportService {
  private _flowService: IFlowService;
  private _blockService: IBlockService;
  private _connectionRepository: IConnectionRepository;
  private _projectService: IProjectService;

  constructor(flowService: IFlowService, blockService: IBlockService, connectionRepository: IConnectionRepository, projectService: IProjectService) {
    this._flowService = flowService;
    this._blockService = blockService;
    this._connectionRepository = connectionRepository;
    this._projectService = projectService;
  }

  public async toPNG(): Promise<void> {
    const pd = this._projectService.snapshot();
    const boardNode = throwErrorIfNull(document.getElementById('board'));
    const filter = (node: Node): boolean => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.classList.contains('react-flow__controls')) return false;
        if (element.classList.contains('react-flow__attribution')) return false;
        if (element.classList.contains('react-flow__minimap')) return false;
        if (element.classList.contains('react-flow__background')) return false;
      }
      return true;
    };
    const blob = await domtoimage.toBlob(boardNode, { bgcolor: '#fff', filter });
    FileSaver.saveAs(blob, pd.title + '.png');
  }

  public toCode(): string {
    type Scope = { scopeof: string; end: string };

    const [startBlock, stopBlock] = this._flowService.validate();
    const stack: Block[] = [startBlock];
    let mapping: PathMapping = {};
    let scope: Scope[] = [];
    let code = '';

    while (stack.length !== 0) {
      const iter: Block = stack.pop() as Block;
      const outgoers: Block[] = this._blockService.getOutgoers(iter);

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
        } else if (currentScope.scopeof === 'CONTAINER') {
          continue;
        }
      }

      code += iter.toCode(scope.length);
      let nextBlocks = Array.of(outgoers[0]);

      if (iter.type === BlockTypes.START_BLOCK) {
        scope.push({ scopeof: iter.type, end: stopBlock.id });
      } else if (iter.type === BlockTypes.STOP_BLOCK) {
        break;
      } else if (iter.isContainer()) {
        scope.push({ scopeof: 'CONTAINER', end: iter.id });
        if (outgoers[0].parentNodeId === iter.id) {
          nextBlocks = Array.of(outgoers[1], outgoers[0]);
        } else {
          nextBlocks = Array.of(outgoers[0], outgoers[1]);
        }
      } else if (iter.type === BlockTypes.DECISION_BLOCK) {
        let falseBlockId = null;
        const connectedEdgeList = this._connectionRepository.findByBlocks(Array.of(iter));
        for (const edge of connectedEdgeList) {
          if (edge.sourceHandle === DecisionBlockHandle.FALSE) falseBlockId = edge.targetId;
        }
        if (falseBlockId === outgoers[0].id) {
          nextBlocks = Array.of(outgoers[0], outgoers[1]);
        } else {
          nextBlocks = Array.of(outgoers[1], outgoers[0]);
        }
        if (!mapping[iter.id]) this._flowService.mapDecisionPaths(iter, mapping);
        scope.push({ scopeof: iter.type, end: mapping[iter.id].id });
      }

      stack.push(...nextBlocks);
    }

    return code;
  }
}
