import React from 'react';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import BlockCreateButton from '../common/BlockCreateButton';
import { Block, BlockTypes } from '../../../types';

export function NodeComponent(block: Block) {
  return (
    <BlockNode className="node-sentinel" block={block}>
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
