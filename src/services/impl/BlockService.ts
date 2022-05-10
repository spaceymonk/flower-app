import { CreateBlockDto } from '../../dto/CreateBlockDto';
import { UpdateBlockDto } from '../../dto/UpdateBlockDto';
import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { GlowTypes } from '../../types';
import { ICanvas } from '../../types/ICanvas';
import { BlockCreateFactory, includesBlock } from '../BlockHelper';
import { IBlockService } from '../IBlockService';

export class BlockService implements IBlockService {
  private blockRepository: IBlockRepository;
  private canvasService: ICanvas;

  constructor(blockRepository: IBlockRepository, canvas: ICanvas) {
    this.blockRepository = blockRepository;
    this.canvasService = canvas;
  }
  public create(dto: CreateBlockDto): Block {
    const b = BlockCreateFactory.create(dto);
    this.blockRepository.save(b);
    return b;
  }
  public update(id: string, dto: UpdateBlockDto): Block {
    const b = this.blockRepository.findById(id).orElseThrow(new Error('Block not found'));
    if (dto.height) b.height = dto.height;
    if (dto.width) b.width = dto.width;
    if (dto.text) b.text = dto.text;
    if (dto.name) b.name = dto.name;
    if (dto.position) b.position = dto.position;
    if (dto.glow) b.glow = dto.glow;
    this.blockRepository.save(b);
    return b;
  }
  public delete(id: string): void {
    const block = this.blockRepository.findById(id).orElseThrow(new Error('Block not found'));
    if (block.isContainer()) {
      const children = this.blockRepository.getDirectChildren(block.id);
      children.forEach((c) => {
        c.parentNodeId = null;
        c.position = { x: c.position.x + block.position.x, y: c.position.y + block.position.y };
      });
      this.blockRepository.saveAll(children);
    }
    this.blockRepository.delete(block);
  }
  public highlight(ids: string[] | null, glowType: GlowTypes = GlowTypes.NONE): void {
    const blocks = this.blockRepository.getAll();
    blocks.forEach((b) => {
      if (ids && ids.includes(b.id)) {
        b.glow = glowType;
      } else {
        b.glow = GlowTypes.NONE;
      }
    });
    this.blockRepository.saveAll(blocks);
  }
  public focus(block: Block): void {
    const w = block.width || 0;
    const h = block.height || 0;
    let x = block.position.x + w / 2;
    let y = block.position.y + h / 2;
    let parentBlockId = block.parentNodeId;
    while (parentBlockId) {
      const parentBlockOpt = this.blockRepository.findById(parentBlockId);
      if (parentBlockOpt.isPresent) {
        const parentBlock = parentBlockOpt.value;
        x += parentBlock.position.x;
        y += parentBlock.position.y;
        parentBlockId = parentBlock.parentNodeId;
      }
    }
    const zoom = 1.85;
    this.canvasService.setCenter({ x, y }, zoom);
  }
  public getAllAvailableChildren(id: string, excludeList: Block[] = []): Block[] {
    return this.blockRepository.getAll().filter((b) => !(b.id === id || b.isSentinel() || includesBlock(excludeList, b)));
  }
  public addParentTo(p: Block, acs: Block[]): void {
    throw new Error('Method not implemented.');
  }
  public removeParentFrom(p: Block, rcs: Block[]): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Tests whether given block is a child of given list of blocks. It can be a direct child or a child of a child etc.
   *
   * @param b block to be tested
   * @param cs list of child blocks
   * @returns true if block is a child of any of the blocks in the list, direct or indirect; false otherwise
   */
  private isIndirectChild(b: Block, cs: Block[]): boolean {
    if (b.parentNodeId === null) return false;
    let parentBlockOpt = this.blockRepository.findById(b.parentNodeId);
    while (parentBlockOpt.isPresent) {
      if (includesBlock(cs, parentBlockOpt.value)) return true;
      if (parentBlockOpt.value.parentNodeId === null) return false;
      parentBlockOpt = this.blockRepository.findById(parentBlockOpt.value.parentNodeId);
    }
    return false;
  }

  private normalizeBlockOrder(block: Block, result: Block[] = []): Block[] {
    result.push(block);
    const children = this.blockRepository.getDirectChildren(block.id);
    children.forEach((child) => this.normalizeBlockOrder(child, result));
    return result;
  }
}
