import { Handle, NodeProps, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function StoreBlockView(node: NodeProps<NodeData>) {
  const block = node.data.block;

  const processed = block.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockView className="node-io" block={block}>
      <div className="handle-wrap">
        <Handle type="target" position={Position.Top} className="handle" />
      </div>
      <div className="header">
        <div className="text">OUTPUT</div>
      </div>
      <div className="text p-1">{processed ? processed : <em className="text-muted">{T.blocks.defaultTxt}</em>}</div>
      <div className="handle-wrap">
        <Handle type="source" position={Position.Bottom} className="handle" />
      </div>
    </BlockView>
  );
}
