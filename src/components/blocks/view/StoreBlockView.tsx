import React from 'react';
import { Handle, Node, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { BlockNotFoundError } from '../../../exceptions/BlockNotFoundError';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { BlockData } from '../../../types';
import { BlockView } from './BlockView';

export function StoreBlockView(node: Node<BlockData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElseThrow(new BlockNotFoundError(node.id)), [blockRepository, node.id]);
  const processed = block.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockView block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="w-100">
        <div className="header">STORE</div>
        <div className="p-2 text-center">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}