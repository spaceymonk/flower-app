import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function StopBlockView(node: NodeProps<NodeData>) {
  const block = node.data.block;
  
  return (
    <BlockView className="node-sentinel" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </BlockView>
  );
}
