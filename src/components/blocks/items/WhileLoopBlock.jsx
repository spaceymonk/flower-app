import React from 'react';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { Handle, Position, useViewport } from 'react-flow-renderer';
import T from '../../../services/MessageConstants';
import { BlockNode } from '../common/BlockNode';
import { BlockTypes } from '../../../services/createNode';
import BlockCreateButton from '../common/BlockCreateButton';
import { ResizableBox } from 'react-resizable';
import useBlockService from '../../../hooks/service/useBlockService';

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.
  const { updateNode } = useBlockService();
  const { zoom } = useViewport();

  const handleResizeStart = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleResize = React.useCallback(
    (event, { size }) => {
      updateNode(node.id, size);
    },
    [node.id, updateNode]
  );

  return (
    <ResizableBox
      transformScale={zoom}
      width={node.data.width || 200}
      height={node.data.height || 200}
      minConstraints={[200, 200]}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
    >
      <BlockNode className="node-container" node={node}>
        <Handle type="target" position={Position.Top} className="handle" />
        <div className="w-100">
          <div className="header">WHILE</div>
          <div className="subtitle">
            {processed ? processed : <em className="text-muted">{T.blocks.defaultTxt}</em>}
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="handle " />
      </BlockNode>
    </ResizableBox>
  );
}

export function CreateButton({ className }) {
  return (
    <BlockCreateButton
      className={className}
      type={BlockTypes.WHILE_LOOP_BLOCK}
      title={T.blocks.while.title}
      description={T.blocks.while.description}
      icon={faRepeat}
    />
  );
}
