import { Handle, NodeProps, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { BlockView } from './BlockView';
import { NodeData, DecisionBlockHandle } from '../../../types';

export function DecisionBlockView(node: NodeProps<NodeData>) {
  const block = node.data.block;

  const processed = block.text; //todo: handle special keywords by bolding them etc.
  return (
    <BlockView className="node-decision" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="decision-fields false">
        <Handle id={DecisionBlockHandle.FALSE} type="source" position={Position.Left} className="handle" />
      </div>
      <div className="text">{processed ? processed : <em className="text-muted">{T.blocks.defaultTxt}</em>}</div>
      <div className="decision-fields true">
        <Handle id={DecisionBlockHandle.TRUE} type="source" position={Position.Right} className="handle " />
      </div>
    </BlockView>
  );
}
