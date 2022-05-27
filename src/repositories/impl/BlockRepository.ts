import { IBlockRepository } from '../IBlockRepository';
import Block from '../../model/Block';
import { Optional } from '../../util/Optional';
import { NodeData, BlockTypes } from '../../types';
import { Node } from 'react-flow-renderer';
import BlockAdapter from '../../adapters/BlockAdapter';

export class BlockRepository implements IBlockRepository {
  private _getBlocks: () => Block[];
  private _setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void);

  private _setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;

  constructor(
    getBlocks: () => Block[],
    setBlocks: ((bs: Block[]) => void) & ((arg0: (bs: Block[]) => Block[]) => void),
    setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>
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
  public countAll(): number {
    return this._getBlocks().length;
  }
  public countByTypes(): { [type in BlockTypes]?: number } {
    const counts: { [type in BlockTypes]?: number } = {};
    this._getBlocks().forEach((b) => {
      counts[b.type] = (counts[b.type] || 0) + 1;
    });
    return counts;
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
  public clear(): void {
    this._setNodes(() => []);
    this._setBlocks(() => []);
  }
  public findById(id: string): Optional<Block> {
    return new Optional(this._getBlocks().find((b) => b.id === id));
  }
}
