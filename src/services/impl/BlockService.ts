import { toast } from 'react-toastify';
import { CreateBlockDto } from '../../dto/CreateBlockDto';
import { UpdateBlockDto } from '../../dto/UpdateBlockDto';
import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { ContainerBlockHandle, GlowTypes } from '../../types';
import { BlockCreateFactory } from '../helpers/BlockHelper';
import { PositionGenerator } from '../../util/PositionGenerator';
import { IBlockService } from '../IBlockService';
import { BlockNotFoundError } from '../../exceptions/BlockNotFoundError';
import { ICanvasFacade } from '../ICanvasFacade';
import FunctionBlock from '../../model/block/FunctionBlock';

export class BlockService implements IBlockService {
  private _blockRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;
  private _canvasService: ICanvasFacade;

  constructor(blockRepository: IBlockRepository, connectionRepository: IConnectionRepository, canvasService: ICanvasFacade) {
    this._blockRepository = blockRepository;
    this._connectionRepository = connectionRepository;
    this._canvasService = canvasService;
  }

  public create(dto: CreateBlockDto): Block {
    dto.position.x = dto.position.x - (dto.position.x % 10);
    dto.position.y = dto.position.y - (dto.position.y % 10);
    const b = BlockCreateFactory.create(dto);
    this._blockRepository.save(b);
    return b;
  }

  public update(id: string, dto: UpdateBlockDto): Block {
    const b = this._blockRepository.findById(id).orElseThrow(new BlockNotFoundError(id));
    if (dto.height) b.height = dto.height;
    if (dto.width) b.width = dto.width;
    if (dto.text) b.text = dto.text;
    if (dto.name) b.name = dto.name;
    if (dto.position) {
      b.position.x = dto.position.x - (dto.position.x % 10);
      b.position.y = dto.position.y - (dto.position.y % 10);
    }
    if (dto.glow) b.glow = dto.glow;
    if (dto.subroutine && b instanceof FunctionBlock) b.subroutine = dto.subroutine;
    this._blockRepository.save(b);
    return b;
  }

  public delete(id: string): void {
    const block = this._blockRepository.findById(id).orElseThrow(new BlockNotFoundError(id));
    if (block.isContainer()) {
      const children = this._blockRepository.findAllByParentNodeId(block.id);
      children.forEach((c) => {
        c.parentNodeId = null;
        c.position = { x: c.position.x + block.position.x, y: c.position.y + block.position.y };
      });
      this._blockRepository.saveAll(children);
    }
    this._connectionRepository.deleteAll(this._connectionRepository.findAllBySourceId(id));
    this._connectionRepository.deleteAll(this._connectionRepository.findAllByTargetId(id));
    this._blockRepository.delete(block);
  }

  public highlight(ids: string[] | null, glowType: GlowTypes = GlowTypes.NONE): void {
    if (ids === null) {
      this._blockRepository.updateHighlightedByIdList([], glowType);
    } else {
      this._blockRepository.updateHighlightedByIdList(ids, glowType);
    }
  }

  public focus(block: Block): void {
    const w = block.width || 0;
    const h = block.height || 0;
    let x = block.position.x + w / 2;
    let y = block.position.y + h / 2;
    let parentBlockId = block.parentNodeId;
    while (parentBlockId) {
      const parentBlockOpt = this._blockRepository.findById(parentBlockId);
      if (parentBlockOpt.isPresent) {
        const parentBlock = parentBlockOpt.value;
        x += parentBlock.position.x;
        y += parentBlock.position.y;
        parentBlockId = parentBlock.parentNodeId;
      }
    }
    const zoom = 1.85;
    this._canvasService.setCenter({ x, y }, zoom);
  }

  public getOutgoers(block: Block): Block[] {
    const cIds = this._connectionRepository.findAllBySourceId(block.id).map((c) => c.targetId);
    return this._blockRepository.findAllByIds(cIds);
  }

  public getAllAvailableChildren(id: string, excludeList: Block[] = []): Block[] {
    const result = [] as Block[];
    const excludeSet = new Set(excludeList.map((b) => b.id));
    const blockIter = this._blockRepository.getAll();
    let it = blockIter.next();
    while (!it.done) {
      const block = it.value;
      if (!(block.id === id || block.isSentinel() || excludeSet.has(block.id))) {
        result.push(block);
      }
      it = blockIter.next();
    }
    return result;
  }

  public addParentTo(parentBlock: Block, childrenToBeAdded: Block[]): void {
    if (!parentBlock.isContainer()) {
      toast.error('Can only add children to container blocks');
      return;
    }
    if (childrenToBeAdded.length === 0) return;
    if (this.isIndirectChild(parentBlock, childrenToBeAdded)) {
      toast.error('Cannot add parent block as child');
      return;
    }
    const positionGen = new PositionGenerator({ x: 0, y: 0 }, 15);

    const affectedBlocks: Block[] = [];
    childrenToBeAdded.forEach((childToBeAdded) => {
      // if block is not already a child of the parent
      if (childToBeAdded.parentNodeId !== parentBlock.id) {
        childToBeAdded.parentNodeId = parentBlock.id;
        childToBeAdded.position = positionGen.nextPosition();
        this.stripConnections(childToBeAdded);
        affectedBlocks.push(...this.normalizeBlockOrder(childToBeAdded));
      }
    });
    const remainingBlocks = this._blockRepository.findAllExcept(affectedBlocks);
    this._blockRepository.clear();
    this._blockRepository.saveAll([...remainingBlocks, ...affectedBlocks]);
  }

  public removeParentFrom(parentBlock: Block, childrenToBeRemoved: Block[]): void {
    if (!parentBlock.isContainer()) {
      toast.error('Can only remove children from container blocks');
      return;
    }
    if (childrenToBeRemoved.length === 0) return;
    const positionGen = new PositionGenerator({ x: parentBlock.position.x, y: parentBlock.position.y }, -15);

    const affectedBlocks: Block[] = [];
    childrenToBeRemoved.forEach((b) => {
      b.parentNodeId = null;
      b.position = positionGen.nextPosition();
      this.stripConnections(b);
      affectedBlocks.push(...this.normalizeBlockOrder(b));
    });
    const remainingBlocks = this._blockRepository.findAllExcept(affectedBlocks);
    this._blockRepository.clear();
    this._blockRepository.saveAll([...remainingBlocks, ...affectedBlocks]);
  }

  private stripConnections(b: Block) {
    const connectedConnections = this._connectionRepository
      .findByBlocks(Array.of(b))
      .filter(
        (e) =>
          !(
            (e.sourceId === b.id && e.sourceHandle === ContainerBlockHandle.INNER_SOURCE) ||
            (e.targetId === b.id && e.targetHandle === ContainerBlockHandle.INNER_TARGET)
          )
      );
    this._connectionRepository.deleteAll(connectedConnections);
  }

  private isIndirectChild(b: Block, cs: Block[]): boolean {
    if (b.parentNodeId === null) return false;
    const childrenSet = new Set(cs.map((c) => c.id));
    let parentBlockOpt = this._blockRepository.findById(b.parentNodeId);
    while (parentBlockOpt.isPresent) {
      if (childrenSet.has(parentBlockOpt.value.id)) return true;
      if (parentBlockOpt.value.parentNodeId === null) return false;
      parentBlockOpt = this._blockRepository.findById(parentBlockOpt.value.parentNodeId);
    }
    return false;
  }

  private normalizeBlockOrder(block: Block, result: Block[] = []): Block[] {
    result.push(block);
    const children = this._blockRepository.findAllByParentNodeId(block.id);
    children.forEach((child) => this.normalizeBlockOrder(child, result));
    return result;
  }
}
