import React from 'react';
import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import BlockCreateButton from '../common/BlockCreateButton';
import { Block, BlockTypes } from '../../../types';

export function NodeComponent(block: Block) {
  return (
    <BlockNode className="node-sentinel" block={block}>
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
