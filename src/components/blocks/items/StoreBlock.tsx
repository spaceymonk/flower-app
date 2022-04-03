import React from 'react';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import BlockCreateButton from '../common/BlockCreateButton';
import { Block, BlockTypes } from '../../../types';

export function NodeComponent(block: Block) {
  const processed = block.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockNode block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="w-100">
        <div className="header">STORE</div>
        <div className="p-2 text-center">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockNode>
  );
}

export function CreateButton() {
  return (
    <BlockCreateButton
      type={BlockTypes.STORE_BLOCK}
      title={T.blocks.store.title}
      description={T.blocks.store.description}
      icon={faPrint}
    />
  );
}
