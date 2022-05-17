import { IBlockRepository } from '../IBlockRepository';
import Block from '../../model/Block';
import { includesBlock } from '../../services/helpers/BlockHelper';
import { Optional } from '../../util/Optional';

export class BlockRepository implements IBlockRepository {
  private _getBlocks: () => Block[];
  private _setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void);

  constructor(getBlocks: () => Block[], setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void)) {
    this._getBlocks = getBlocks;
    this._setBlocks = setBlocks;
  }

  public findAllByIds(ids: string[]): Block[] {
    return this._getBlocks().filter((b) => ids.includes(b.id));
  }
  public getAll(): Block[] {
    return this._getBlocks();
  }
  public save(block: Block): void {
    this._setBlocks((blocks) => blocks.map((b) => (b.id === block.id ? block : b)));
  }
  public delete(block: Block): void {
    this._setBlocks((blocks) => blocks.filter((b) => b.id !== block.id));
  }
  public getDirectChildren(pid: string): Block[] {
    return this._getBlocks().filter((b) => b.parentNodeId === pid);
  }
  public existsById(id: string): boolean {
    return this._getBlocks().some((b) => b.id === id);
  }
  public saveAll(bs: Block[]): void {
    this._setBlocks((blocks) =>
      blocks.map((b) => {
        const block = bs.find((b2) => b2.id === b.id);
        return block ? block : b;
      })
    );
  }
  public deleteAll(bs: Block[]): void {
    this._setBlocks((blocks) => blocks.filter((b) => !includesBlock(bs, b)));
  }
  public findById(id: string): Optional<Block> {
    return new Optional(this._getBlocks().find((b) => b.id === id));
  }
}
