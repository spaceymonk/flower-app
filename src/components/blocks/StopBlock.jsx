import React from 'react';
import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { NodeCreateButton, BaseNodeComponent } from './Block';

export function NodeComponent(node) {
  return (
    <BaseNodeComponent className="node-sentinel" node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </BaseNodeComponent>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'stop',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <NodeCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.stop.title}
      description={T.blocks.stop.description}
      icon={faCircleStop}
    />
  );
}
