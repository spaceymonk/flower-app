import FileSaver from 'file-saver';
import { ProjectData, BlockTypes, DecisionBlockHandle } from '../../types';
import { throwErrorIfNull } from '../../util';
import { validateFlow, PathMapping, mapDecisionPaths } from '../FlowParser';
import { IExportService } from '../IExportService';
import domtoimage from 'dom-to-image';
import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';

export class ExportService implements IExportService {
  private _blockRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;

  constructor(blockRepository: IBlockRepository, connectionRepository: IConnectionRepository) {
    this._blockRepository = blockRepository;
    this._connectionRepository = connectionRepository;
  }

  public async toPNG(title: string): Promise<void> {
    const blob = await domtoimage.toBlob(throwErrorIfNull(document.getElementById('board')), { bgcolor: '#fff' });
    FileSaver.saveAs(blob, title + '.png');
  }

  public toCode(pd: ProjectData): string {
    type Scope = { scopeof: string; end: string };

    const [startBlock, stopBlock] = validateFlow(pd.blocks, pd.edges);
    const stack: Block[] = [startBlock];
    let mapping: PathMapping = {};
    let scope: Scope[] = [];
    let code = '';

    while (stack.length !== 0) {
      const iter: Block = stack.pop() as Block;
      const outgoers: Block[] = this._blockRepository.findAllByIds(this._connectionRepository.findAllBySourceId(iter.id).map((c) => c.targetId));

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
        if (!mapping[iter.id]) mapDecisionPaths(iter, pd.blocks, pd.edges, mapping);
        scope.push({ scopeof: iter.type, end: mapping[iter.id].id });
      } else {
        throw new Error('Unsupported block type: ' + iter.type);
      }
    }

    return code;
  }
}
