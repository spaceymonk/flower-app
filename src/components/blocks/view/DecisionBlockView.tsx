import { Handle, Node, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { BlockView } from './BlockView';
import { BlockData, DecisionBlockHandle } from '../../../types';
import React from 'react';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { BlockNotFoundError } from '../../../exceptions/BlockNotFoundError';

export function DecisionBlockView(node: Node<BlockData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElseThrow(new BlockNotFoundError(node.id)), [blockRepository, node.id]);
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
