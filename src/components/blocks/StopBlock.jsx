import React from 'react';
import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../services/MessageConstants';
import { BlockNode } from './BlockNode';
import BlockCreateButton from './BlockCreateButton';
import { BlockTypes } from '../../services/createNodeFactory';

export function NodeComponent(node) {
  return (
    <BlockNode className="node-sentinel" node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </BlockNode>
  );
}

export function CreateButton({ className }) {
  return (
    <BlockCreateButton
      className={className}
      type={BlockTypes.STOP_BLOCK}
      title={T.blocks.stop.title}
      description={T.blocks.stop.description}
      icon={faCircleStop}
    />
  );
}
