import React from 'react';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import { BlockTypes } from '../../../services/createNode';
import BlockCreateButton from '../common/BlockCreateButton';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockNode className="node-statement" node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div>
        {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
        {processed}
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BlockNode>
  );
}

export function CreateButton() {
  return (
    <BlockCreateButton
      type={BlockTypes.STATEMENT_BLOCK}
      title={T.blocks.statement.title}
      description={T.blocks.statement.description}
      icon={faCode}
    />
  );
}
