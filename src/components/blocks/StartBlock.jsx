import React from 'react';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { NodeCreateButton, BaseNodeComponent } from './Block';

export function NodeComponent(node) {
  return (
    <BaseNodeComponent className="node-sentinel" node={node}>
      <div className="content">START</div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BaseNodeComponent>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'start',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <NodeCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.start.title}
      description={T.blocks.start.description}
      icon={faCirclePlay}
    />
  );
}
