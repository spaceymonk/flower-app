import { Handle, Position } from 'react-flow-renderer';
import Block from '../../../model/Block';
import { BlockView } from './BlockView';

export function StartBlockView(block: Block) {
  return (
    <BlockView className="node-sentinel" block={block}>
      <div className="content">START</div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
