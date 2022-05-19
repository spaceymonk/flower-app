import { IBlockRepository } from '../IBlockRepository';
import Block from '../../model/Block';
import { Optional } from '../../util/Optional';
import { BlockData } from '../../types';
import { Node } from 'react-flow-renderer';
import BlockAdapter from '../../adapters/BlockAdapter';

export class BlockRepository implements IBlockRepository {
  private _getBlocks: () => Block[];
  private _setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void);

  private _setNodes: React.Dispatch<React.SetStateAction<Node<BlockData>[]>>;

  constructor(
    getBlocks: () => Block[],
    setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void),
    setNodes: React.Dispatch<React.SetStateAction<Node<BlockData>[]>>
  ) {
    this._getBlocks = getBlocks;
    this._setBlocks = setBlocks;
    this._setNodes = setNodes;
  }

  public findAllByIds(ids: string[]): Block[] {
    return this._getBlocks().filter((b) => ids.includes(b.id));
  }
  public getAll(): Block[] {
    return this._getBlocks();
  }
  public save(block: Block): void {
    this._setNodes((nodes) => {
      if (nodes.some((n) => n.id === block.id)) {
        return nodes.map((n) => (n.id === block.id ? BlockAdapter.toNode(block) : n));
      } else {
        return [...nodes, BlockAdapter.toNode(block)];
      }
    });
    this._setBlocks((blocks) => {
      if (blocks.some((b) => b.id === block.id)) {
        return blocks.map((b) => (b.id === block.id ? block : b));
      } else {
        return [...blocks, block];
      }
    });
  }
  public delete(block: Block): void {
    this._setNodes((nodes) => nodes.filter((n) => n.id !== block.id));
    this._setBlocks((blocks) => blocks.filter((b) => b.id !== block.id));
  }
  public getDirectChildren(pid: string): Block[] {
    return this._getBlocks().filter((b) => b.parentNodeId === pid);
  }
  public existsById(id: string): boolean {
    return this._getBlocks().some((b) => b.id === id);
  }
  public saveAll(bs: Block[]): void {
    bs.forEach((b) => this.save(b));
  }
  public deleteAll(bs: Block[]): void {
    bs.forEach((b) => this.delete(b));
  }
  public findById(id: string): Optional<Block> {
    return new Optional(this._getBlocks().find((b) => b.id === id));
  }
}
