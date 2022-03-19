import React from 'react';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { NodeCreateButton, BaseNodeComponent } from './Block';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BaseNodeComponent node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="w-100">
        <div className="header">LOAD</div>
        <div className="p-2 text-center">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BaseNodeComponent>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'load',
      position: pos,
      data: { text: undefined },
    };
  }
  return (
    <NodeCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.load.title}
      description={T.blocks.load.description}
      icon={faTruckLoading}
    />
  );
}
