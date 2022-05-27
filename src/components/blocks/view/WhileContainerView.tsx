import { Handle, Node, Position } from 'react-flow-renderer';
import T from '../../../config/MessageConstants';
import { ContainerBlockView } from './ContainerBlockView';
import { NodeData, ContainerBlockHandle } from '../../../types';
import React from 'react';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function WhileLoopBlockView(node: Node<NodeData>) {
  const { blockRepository } = useServiceContext();
  const block = React.useMemo(() => blockRepository.findById(node.id).orElse(null), [blockRepository, node.id]);

  if (block === null) return <></>;
  
  const processed = block.text; //todo: handle special keywords by bolding them etc.

  return (
    <ContainerBlockView block={block}>
      <Handle type="target" id={ContainerBlockHandle.OUTER_TARGET} position={Position.Top} className="handle" />
      <Handle type="source" id={ContainerBlockHandle.INNER_SOURCE} position={Position.Bottom} className="handle-container source" />
      <div className="w-100">
        <div className="header">WHILE</div>
        <div className="subtitle">{processed ? processed : <em className="text-muted">{T.blocks.defaultTxt}</em>}</div>
      </div>
      <Handle type="target" id={ContainerBlockHandle.INNER_TARGET} position={Position.Top} className="handle-container target" />
      <Handle type="source" id={ContainerBlockHandle.OUTER_SOURCE} position={Position.Bottom} className="handle" />
    </ContainerBlockView>
  );
}
