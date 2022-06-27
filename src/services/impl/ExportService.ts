import FileSaver from 'file-saver';
import { BlockTypes, DecisionBlockHandle } from '../../types';
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
        if (element.classList.contains('react-flow__handle')) return false;
      }
      return true;
    };
    const blob = await domtoimage.toBlob(boardNode, { bgcolor: '#fff', filter });
    FileSaver.saveAs(blob, pd.title + '.png');
  }

  public toCode(): string {
    const path = [] as Unit[];
    const [startBlock] = this._flowService.validate({ startMustPresent: true });
    const processed = new Set<Block>();
    const visiting = new Set<Block>();

    this.visitNodes(startBlock, path, processed, visiting);
    const code = this.generateCode(path);

    return code;
  }

  private generateCode(path: Unit[]): string {
    let code = '';
    let indent = 0;
    for (let i = path.length - 1; i >= 0; i--) {
      const unit = path[i];

      if (unit.type === 'goto') {
        code += `    : ${'  '.repeat(indent)}goto ${unit.next.slice(0, 4)};\n`;
      } else if (unit.type === 'end-container') {
        indent--;
        code += `    : ${'  '.repeat(indent)}end-container ${unit.next.slice(0, 4)};\n`;
      } else if (unit.type === 'end-decision') {
        code += `    : ${'  '.repeat(indent)}goto ${unit.next.slice(0, 4)};\n`;
        indent--;
      } else {
        code += `${unit.block.id.slice(0, 4)}: ${unit.block.toCode(indent)};\n`;
        if (unit.type === BlockTypes.DECISION_BLOCK || unit.block.isContainer() || unit.block.type === BlockTypes.START_BLOCK) {
          indent++;
        }
      }
    }
    return code;
  }

  private visitNodes(block: Block, path: Unit[], processed: Set<Block>, visiting: Set<Block>): void {
    if (processed.has(block)) {
      path.push({ block, type: 'end-decision', next: block.id });
      return;
    }
    if (visiting.has(block)) {
      const lastUnit = path.at(-1);
      if (!lastUnit || lastUnit.block.id !== block.id || lastUnit.type !== 'end-container') {
        path.push({ block, type: 'goto', next: block.id });
      }
      return;
    }
    visiting.add(block);

    let ref = '';
    const next = this.sortNext(block, this._blockService.getOutgoers(block));
    let handleBranch = true;
    for (const nextBlock of next) {
      this.visitNodes(nextBlock, path, processed, visiting);
      if (processed.has(nextBlock)) {
        ref = nextBlock.id;
      }
      if (handleBranch && block.isContainer()) {
        path.push({ block, next: nextBlock.id, type: 'end-container' });
        handleBranch = false;
      }
    }

    path.push({ block, next: ref, type: block.type });
    processed.add(block);
    visiting.delete(block);
  }

  private sortNext(block: Block, outgoers: Block[]): Block[] {
    if (block.type === BlockTypes.DECISION_BLOCK) {
      let falseBlockId = null;
      const connectedEdgeList = this._connectionRepository.findByBlocks(Array.of(block));
      for (const edge of connectedEdgeList) {
        if (edge.sourceHandle === DecisionBlockHandle.FALSE) falseBlockId = edge.targetId;
      }
      if (falseBlockId === outgoers[0].id) {
        return Array.of(outgoers[0], outgoers[1]);
      } else {
        return Array.of(outgoers[1], outgoers[0]);
      }
    } else if (block.isContainer()) {
      if (outgoers[0].parentNodeId === block.id) {
        return Array.of(outgoers[1], outgoers[0]);
      } else {
        return Array.of(outgoers[0], outgoers[1]);
      }
    }
    return outgoers;
  }
}

type Unit = {
  block: Block;
  next: string;
  type: 'end-decision' | 'end-container' | 'else' | 'goto' | BlockTypes;
};
