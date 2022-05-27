import FileSaver from 'file-saver';
import { BlockTypes, DecisionBlockHandle, PathMapping } from '../../types';
import { throwErrorIfNull } from '../../util/common';
import { IExportService } from '../IExportService';
import domtoimage from 'dom-to-image';
import Block from '../../model/Block';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { IBlockService } from '../IBlockService';
import { IFlowService } from '../IFlowService';
import LocalStorageManager from '../../config/LocalStorageManager';

export class ExportService implements IExportService {
  private _flowService: IFlowService;
  private _blockService: IBlockService;
  private _connectionRepository: IConnectionRepository;

  constructor(flowService: IFlowService, blockService: IBlockService, connectionRepository: IConnectionRepository) {
    this._flowService = flowService;
    this._blockService = blockService;
    this._connectionRepository = connectionRepository;
  }

  public async toPNG(): Promise<void> {
    const pd = LocalStorageManager.get();
    const blob = await domtoimage.toBlob(throwErrorIfNull(document.getElementById('board')), { bgcolor: '#fff' });
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
        code += `${'  '.repeat(scope.length)}load ${iter.text}\n`;
        stack.push(outgoers[0]);
      } else if (iter.type === BlockTypes.STORE_BLOCK) {
        code += `${'  '.repeat(scope.length)}store ${iter.text}\n`;
        stack.push(outgoers[0]);
      } else if (iter.type === BlockTypes.STATEMENT_BLOCK) {
        code += `${'  '.repeat(scope.length)}${iter.text}\n`;
        stack.push(outgoers[0]);
      } else if (iter.type === BlockTypes.WHILE_LOOP_BLOCK) {
        code += `${'  '.repeat(scope.length)}while (${iter.text})\n`;
        scope.push({ scopeof: iter.type, end: iter.id });
        if (outgoers[0].parentNodeId === iter.id) {
          stack.push(outgoers[1], outgoers[0]);
        } else {
          stack.push(outgoers[0], outgoers[1]);
        }
      } else if (iter.type === BlockTypes.DECISION_BLOCK) {
        code += `${'  '.repeat(scope.length)}if (${iter.text})\n`;
        let falseBlockId = null;
        const connectedEdgeList = this._connectionRepository.findByBlocks(Array.of(iter));
        for (const edge of connectedEdgeList) {
          if (edge.sourceHandle === DecisionBlockHandle.FALSE) falseBlockId = edge.targetId;
        }
        if (falseBlockId === outgoers[0].id) {
          stack.push(outgoers[0], outgoers[1]);
        } else {
          stack.push(outgoers[1], outgoers[0]);
        }
        if (!mapping[iter.id]) this._flowService.mapDecisionPaths(iter, mapping);
        scope.push({ scopeof: iter.type, end: mapping[iter.id].id });
      } else {
        throw new Error('Unsupported block type: ' + iter.type);
      }
    }

    return code;
  }
}
