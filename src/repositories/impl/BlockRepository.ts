import { IBlockRepository } from '../IBlockRepository';
import Block from '../../model/Block';
import { Optional } from '../../util/Optional';
import { NodeData, BlockTypes, GlowTypes } from '../../types';
import { Node } from 'react-flow-renderer';
import BlockAdapter from '../../adapters/BlockAdapter';

const lastAccessedItem = { id: '', index: -1 };

export class BlockRepository implements IBlockRepository {
  private _blockMap: Map<string, Block>;
  private _setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;

  constructor(_blockMap: Map<string, Block>, setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>) {
    this._blockMap = _blockMap;
    this._setNodes = setNodes;
  }
  updateHighlightedByIdList(ids: string[], glowType: GlowTypes): void {
    const result = [] as Block[];
    const idSet = new Set<string>(ids);
    this._blockMap.forEach((b) => {
      if (idSet.has(b.id)) {
        b.glow = glowType;
      } else {
        b.glow = GlowTypes.NONE;
      }
      result.push(b);
    });
    this._setNodes(() => result.map((b) => BlockAdapter.toNode(b)));
  }

  public findAllExcept(blocks: Block[]): Block[] {
    const result = [] as Block[];
    const blockIds = new Set(blocks.map((b) => b.id));
    this._blockMap.forEach((b) => {
      if (!blockIds.has(b.id)) {
        result.push(b);
      }
    });
    return result;
  }
  public findAllByIds(ids: string[]): Block[] {
    const result = [] as Block[];
    ids.forEach((id) => {
      const block = this._blockMap.get(id);
      if (block) {
        result.push(block);
      }
    });
    return result;
  }
  public getAll(): IterableIterator<Block> {
    return this._blockMap.values();
  }
  public countAll(): number {
    return this._blockMap.size;
  }
  public countByTypes(): { [type in BlockTypes]?: number } {
    const counts: { [type in BlockTypes]?: number } = {};
    this._blockMap.forEach((b) => {
      counts[b.type] = (counts[b.type] || 0) + 1;
    });
    return counts;
  }

  public save(block: Block): void {
    if (block.id === lastAccessedItem.id) {
      this._setNodes((nodes) => {
        nodes[lastAccessedItem.index] = BlockAdapter.toNode(block);
        return nodes;
      });
    } else {
      this._setNodes((nodes) => {
        if (this._blockMap.has(block.id)) {
          return nodes.map((n, index) => {
            if (n.id === block.id) {
              lastAccessedItem.id = block.id;
              lastAccessedItem.index = index;
              return BlockAdapter.toNode(block);
            } else {
              return n;
            }
          });
        } else {
          return nodes.concat(BlockAdapter.toNode(block));
        }
      });
    }
    this._blockMap.set(block.id, block);
  }
  public delete(block: Block): void {
    lastAccessedItem.id = '';
    this._setNodes((nodes) => nodes.filter((n) => n.id !== block.id));
    this._blockMap.delete(block.id);
  }
  public findAllByParentNodeId(pid: string): Block[] {
    const result = [] as Block[];
    this._blockMap.forEach((b) => {
      if (b.parentNodeId === pid) {
        result.push(b);
      }
    });
    return result;
  }
  public existsById(id: string): boolean {
    return this._blockMap.has(id);
  }
  public saveAll(bs: Block[]): void {
    if (this._blockMap.size === 0) {
      this._setNodes(() =>
        bs.map((b) => {
          this._blockMap.set(b.id, b);
          return BlockAdapter.toNode(b);
        })
      );
    } else {
      bs.forEach((b) => this.save(b));
    }
  }
  public deleteAll(bs: Block[]): void {
    const blockIds = new Set(bs.map((b) => b.id));
    this._setNodes((nodes) => nodes.filter((n) => !blockIds.has(n.id)));
    blockIds.forEach((id) => this._blockMap.delete(id));
    lastAccessedItem.id = '';
  }
  public clear(): void {
    lastAccessedItem.id = '';
    this._setNodes(() => []);
    this._blockMap.clear();
  }
  public findById(id: string): Optional<Block> {
    return new Optional(this._blockMap.get(id));
  }
}
