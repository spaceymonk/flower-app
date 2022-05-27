import React from 'react';
import { Handle, Node, Position } from 'react-flow-renderer';
import { useServiceContext } from '../../../providers/ServiceProvider';
import { NodeData } from '../../../types';
import { BlockView } from './BlockView';

export function StopBlockView(node: Node<NodeData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElse(null), [blockRepository, node.id]);

  if (block === null) return <></>;
  
  return (
    <BlockView className="node-sentinel" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </BlockView>
  );
}
