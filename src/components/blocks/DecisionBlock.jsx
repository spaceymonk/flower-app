import React from 'react';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { NodeCreateButton, BaseNodeComponent } from './Block';
import { Handle, Position } from 'react-flow-renderer';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BaseNodeComponent className="node-decision" node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="decision-fields false">F</div>
      <div className="w-100">
        <div className="header">IF</div>
        <div className="text-center p-2">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <div className="decision-fields true">T</div>
      <Handle id="false" type="source" position={Position.Left} className="handle" />
      <Handle id="true" type="source" position={Position.Right} className="handle " />
    </BaseNodeComponent>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'decision',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <NodeCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.decision.title}
      description={T.blocks.decision.description}
      icon={faCodeBranch}
    />
  );
}
