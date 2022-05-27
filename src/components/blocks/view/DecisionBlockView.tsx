import { Handle, Node, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { BlockView } from './BlockView';
import { NodeData, DecisionBlockHandle } from '../../../types';

export function DecisionBlockView(node: Node<NodeData>) {
  const block = node.data.block;

  const processed = block.text; //todo: handle special keywords by bolding them etc.
  return (
    <BlockView className="node-decision" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="decision-fields false">F</div>
      <div className="w-100">
        <div className="header">IF</div>
        <div className="text-center p-2">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <div className="decision-fields true">T</div>
      <Handle id={DecisionBlockHandle.FALSE} type="source" position={Position.Left} className="handle" />
      <Handle id={DecisionBlockHandle.TRUE} type="source" position={Position.Right} className="handle " />
    </BlockView>
  );
}
