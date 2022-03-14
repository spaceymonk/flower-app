import React from 'react';
import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { BaseCreateButton, BaseNodeComponent, BaseNodeModal } from './Block';

export function NodeModal({ show, onClose, node }) {
  return <BaseNodeModal show={show} onClose={onClose} node={node} />;
}

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
    <BaseCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.stop.title}
      description={T.blocks.stop.description}
      icon={faCircleStop}
    />
  );
}
