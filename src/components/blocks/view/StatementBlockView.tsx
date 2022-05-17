import { Handle, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { BlockView } from './BlockView';

export function StatementBlockView(block: Block) {
  const processed = block.data.text; //todo: handle special keywords by bolding them etc.

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
