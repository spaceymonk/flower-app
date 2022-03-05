import React from 'react';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { BaseCreateButton } from './Block';

export function NodeComponent() {
  return (
    <div className="d-flex node node-sentinel">
      <div className="content">START</div>
      <Handle id="false" type="source" position={Position.Bottom} className="handle" />
    </div>
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
    <BaseCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.start.title}
      description={T.blocks.start.description}
      icon={faCirclePlay}
    />
  );
}
