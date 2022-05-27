import { Handle, Node, Position } from 'react-flow-renderer';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function StartBlockView(node: Node<NodeData>) {
  const block = node.data.block;
  
  return (
    <BlockView className="node-sentinel" block={block}>
      <div className="content">START</div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
