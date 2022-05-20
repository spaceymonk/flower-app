import React from 'react';
import { Handle, Node, Position } from 'react-flow-renderer';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { BlockData } from '../../../types';
import { BlockView } from './BlockView';

export function StartBlockView(node: Node<BlockData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElse(null), [blockRepository, node.id]);

  if (block === null) return <></>;
  
  return (
    <BlockView className="node-sentinel" block={block}>
      <div className="content">START</div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockView>
  );
}
