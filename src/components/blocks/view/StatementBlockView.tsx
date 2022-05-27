import { Handle, Node, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function StatementBlockView(node: Node<NodeData>) {
  const block = node.data.block;
  
  const processed = block.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockView className="node-statement" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div>
        {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
        {processed}
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
