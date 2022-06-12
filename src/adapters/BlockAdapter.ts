import { Node } from 'react-flow-renderer';
import Block from '../model/Block';
import { NodeData } from '../types';

class BlockAdapter {
  public static toNode(block: Block): Node<NodeData> {
    return {
      id: block.id,
      type: block.type,
      position: block.position,
      parentNode: block.parentNodeId || undefined,
      extent: block.parentNodeId ? 'parent' : undefined,
      data: { block },
      dragHandle: '.node',
    };
  }
}

export default BlockAdapter;
