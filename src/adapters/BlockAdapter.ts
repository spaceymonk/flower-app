import { Node } from 'react-flow-renderer';
import Block from '../model/Block';
import { BlockData } from '../types';

class BlockAdapter {
  public static toNode(block: Block): Node<BlockData> {
    return {
      id: block.id,
      type: block.type,
      position: block.position,
      parentNode: block.parentNodeId || undefined,
      extent: block.parentNodeId ? 'parent' : undefined,
      data: {
        text: block.text,
        glow: block.glow,
        name: block.name,
      },
    };
  }
}

export default BlockAdapter;
