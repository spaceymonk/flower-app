import React from 'react';
import { useViewport } from 'react-flow-renderer';
import { BlockNode } from '../common/BlockNode';
import { ResizableBox } from 'react-resizable';
import useBlockService from '../../../hooks/service/useBlockService';

export function ContainerNode({ node, ...props }) {
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
      <BlockNode {...props} className="node-container" node={node} />
    </ResizableBox>
  );
}
