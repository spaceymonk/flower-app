import { CoordinateExtent, Node, XYPosition } from 'react-flow-renderer';
import Block from '../model/block/Block';
import { BlockData } from '../types';

class BlockAdapter implements Node<BlockData> {
  private _block: Block;
  public extent?: 'parent' | CoordinateExtent;

  constructor(block: Block) {
    this._block = block;
    if (this._block.parentNodeId) {
      this.extent = 'parent';
    } else {
      this.extent = undefined;
    }
  }

  get id(): string {
    return this._block.id;
  }
  get type(): string {
    return this._block.type;
  }
  get position(): XYPosition {
    return this._block.position;
  }
  get parentNode(): string | undefined {
    return this._block.parentNodeId || undefined;
  }
  get data(): BlockData {
    return {
      text: this._block.text,
      glow: this._block.glow,
      name: this._block.name,
    };
  }

  setPosition(position: XYPosition): void {
    this._block.position = position;
  }
}

export default BlockAdapter;
