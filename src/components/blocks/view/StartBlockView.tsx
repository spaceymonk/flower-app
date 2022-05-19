import React from 'react';
import { Handle, Node, Position } from 'react-flow-renderer';
import { BlockNotFoundError } from '../../../exceptions/BlockNotFoundError';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { BlockData } from '../../../types';
import { BlockView } from './BlockView';

export function StartBlockView(node: Node<BlockData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElseThrow(new BlockNotFoundError(node.id)), [blockRepository, node.id]);
  return (
    <BlockView className="node-sentinel" block={block}>
      <div className="content">START</div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
