import { Handle, Position } from 'react-flow-renderer';
import Block from '../../../model/Block';
import { BlockView } from './BlockView';

export function StopBlockView(block: Block) {
  return (
    <BlockView className="node-sentinel" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </BlockView>
  );
}
