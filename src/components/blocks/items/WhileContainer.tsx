import React from 'react';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import BlockCreateButton from '../common/BlockCreateButton';
import { ContainerNode } from '../common/ContainerNode';
import { Block, BlockTypes, ContainerBlockHandle } from '../../../types';

export function NodeComponent(block: Block) {
  const processed = block.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <ContainerNode block={block}>
      <Handle type="target" id={ContainerBlockHandle.OUTER_TARGET} position={Position.Top} className="handle" />
      <Handle type="source" id={ContainerBlockHandle.INNER_SOURCE} position={Position.Top} className="handle-container source" />
      <div className="w-100">
        <div className="header">WHILE</div>
        <div className="subtitle">{processed ? processed : <em className="text-muted">{T.blocks.defaultTxt}</em>}</div>
      </div>
      <Handle type="target" id={ContainerBlockHandle.INNER_TARGET} position={Position.Bottom} className="handle-container target" />
      <Handle type="source" id={ContainerBlockHandle.OUTER_SOURCE} position={Position.Bottom} className="handle" />
    </ContainerNode>
  );
}

export function CreateButton() {
  return (
    <BlockCreateButton
      type={BlockTypes.WHILE_LOOP_BLOCK}
      title={T.blocks.while.title}
      description={T.blocks.while.description}
      icon={faRepeat}
    />
  );
}
