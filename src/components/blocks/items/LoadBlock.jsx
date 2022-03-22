import React from 'react';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import { BlockTypes } from '../../../services/createNode';
import BlockCreateButton from '../common/BlockCreateButton';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockNode node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="w-100">
        <div className="header">LOAD</div>
        <div className="p-2 text-center">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockNode>
  );
}

export function CreateButton({ className }) {
  return (
    <BlockCreateButton
      className={className}
      type={BlockTypes.LOAD_BLOCK}
      title={T.blocks.load.title}
      description={T.blocks.load.description}
      icon={faTruckLoading}
    />
  );
}
