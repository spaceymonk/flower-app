import React from 'react';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockTypes } from '../../../services/createNode';
import BlockCreateButton from '../common/BlockCreateButton';
import { ContainerNode } from '../common/ContainerNode';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <ContainerNode node={node}>
      <Handle type="target" id="outer-target" position={Position.Top} className="handle" />
      <Handle type="source" id="inner-source" position={Position.Top} className="handle-container source" />
      <div className="w-100">
        <div className="header">WHILE</div>
        <div className="subtitle">{processed ? processed : <em className="text-muted">{T.blocks.defaultTxt}</em>}</div>
      </div>
      <Handle type="target" id="inner-target" position={Position.Bottom} className="handle-container target" />
      <Handle type="source" id="outer-source" position={Position.Bottom} className="handle" />
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
