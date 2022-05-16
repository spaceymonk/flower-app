import { IBlockRepository } from '../IBlockRepository';
import Block from '../../model/Block';
import { includesBlock } from '../../services/BlockHelper';
import { Optional } from '../../types/Optional';

export class BlockRepository implements IBlockRepository {
  private _getBlocks: () => Block[];
  private _setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void);

  constructor(getBlocks: () => Block[], setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void)) {
    this._getBlocks = getBlocks;
    this._setBlocks = setBlocks;
  }
  findAllByIds(ids: string[]): Block[] {
    return this._getBlocks().filter((b) => ids.includes(b.id));
  }
  getAll(): Block[] {
    return this._getBlocks();
  }
  save(block: Block): void {
    this._setBlocks((blocks) => blocks.map((b) => (b.id === block.id ? block : b)));
  }
  delete(block: Block): void {
    this._setBlocks((blocks) => blocks.filter((b) => b.id !== block.id));
  }
  getDirectChildren(pid: string): Block[] {
    return this._getBlocks().filter((b) => b.parentNodeId === pid);
  }
  existsById(id: string): boolean {
    return this._getBlocks().some((b) => b.id === id);
  }
  saveAll(bs: Block[]): void {
    this._setBlocks((blocks) =>
      blocks.map((b) => {
        const block = bs.find((b2) => b2.id === b.id);
        return block ? block : b;
      })
    );
  }
  deleteAll(bs: Block[]): void {
    this._setBlocks((blocks) => blocks.filter((b) => !includesBlock(bs, b)));
  }
  findById(id: string): Optional<Block> {
    return new Optional(this._getBlocks().find((b) => b.id === id));
  }
}
