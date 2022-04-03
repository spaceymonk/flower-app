import React from 'react';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import { BlockTypes } from '../../../services/createNode';
import BlockCreateButton from '../common/BlockCreateButton';

export function NodeComponent(node) {
  return (
    <BlockNode className="node-sentinel" node={node}>
      <div className="content">START</div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockNode>
  );
}

export function CreateButton() {
  return (
    <BlockCreateButton
      type={BlockTypes.START_BLOCK}
      title={T.blocks.start.title}
      description={T.blocks.start.description}
      icon={faCirclePlay}
    />
  );
}
