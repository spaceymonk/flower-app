import React from 'react';
import { useViewport } from 'react-flow-renderer';
import { BlockNode, BlockNodeProps } from './BlockNode';
import { ResizableBox } from 'react-resizable';
import useBlockHelper from '../../../hooks/useBlockHelper';
import PropTypes from 'prop-types';

export function ContainerNode({ block, ...props }: ContainerNodeProps) {
  const { updateBlockData } = useBlockHelper();
  const { zoom } = useViewport();

  const handleResizeStart = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleResize = React.useCallback(
    (event, { size }) => {
      updateBlockData(block.id, { width: size.width, height: size.height });
    },
    [block.id, updateBlockData]
  );

  return (
    <ResizableBox
      // @ts-ignore: invalid @types/react-resizable package
      transformScale={zoom}
      width={block.data.width || 200}
      height={block.data.height || 200}
      minConstraints={[200, 200]}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
    >
      <BlockNode {...props} className="node-container" block={block} />
    </ResizableBox>
  );
}

ContainerNode.propTypes = {
  block: PropTypes.object.isRequired,
};

export interface ContainerNodeProps extends BlockNodeProps {}