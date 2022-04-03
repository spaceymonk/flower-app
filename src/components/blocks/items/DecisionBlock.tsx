import React from 'react';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import BlockCreateButton from '../common/BlockCreateButton';
import { Block, BlockTypes } from '../../../types';

export function NodeComponent(block: Block) {
  const processed = block.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BlockNode className="node-decision" block={block}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="decision-fields false">F</div>
      <div className="w-100">
        <div className="header">IF</div>
        <div className="text-center p-2">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <div className="decision-fields true">T</div>
      <Handle id="false" type="source" position={Position.Left} className="handle" />
      <Handle id="true" type="source" position={Position.Right} className="handle " />
    </BlockNode>
  );
}

export function CreateButton() {
  return (
    <BlockCreateButton
      type={BlockTypes.DECISION_BLOCK}
      title={T.blocks.decision.title}
      description={T.blocks.decision.description}
      icon={faCodeBranch}
    />
  );
}
