import React from 'react';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { NodeCreateButton, BaseNodeComponent } from './Block';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BaseNodeComponent className="node-statement" node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div>
        {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
        {processed}
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BaseNodeComponent>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'statement',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <NodeCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.statement.title}
      description={T.blocks.statement.description}
      icon={faCode}
    />
  );
}
