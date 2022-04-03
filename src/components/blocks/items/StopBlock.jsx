import React from 'react';
import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import { BlockTypes } from '../../../services/createNode';
import BlockCreateButton from '../common/BlockCreateButton';

export function NodeComponent(node) {
  return (
    <BlockNode className="node-sentinel" node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </BlockNode>
  );
}

export function CreateButton() {
  return (
    <BlockCreateButton
      type={BlockTypes.STOP_BLOCK}
      title={T.blocks.stop.title}
      description={T.blocks.stop.description}
      icon={faCircleStop}
    />
  );
}
