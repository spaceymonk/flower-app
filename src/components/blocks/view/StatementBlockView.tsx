import React from 'react';
import { Handle, Node, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function StatementBlockView(node: Node<NodeData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElse(null), [blockRepository, node.id]);

  if (block === null) return <></>;
  
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
