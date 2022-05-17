import React from 'react';
import { useViewport } from 'react-flow-renderer';
import { BlockView, BlockNodeProps } from './BlockView';
import { ResizableBox } from 'react-resizable';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function ContainerBlockView({ block, ...props }: ContainerNodeProps) {
  const { blockService } = useServiceContext();
  const { zoom } = useViewport();

  const handleResizeStart = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleResize = React.useCallback(
    (event, { size }) => {
      blockService.update(block.id, { width: size.width, height: size.height });
    },
    [block.id, blockService]
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
      <BlockView {...props} className="node-container" block={block} />
    </ResizableBox>
  );
}

ContainerBlockView.propTypes = {
  block: PropTypes.object.isRequired,
};

export interface ContainerNodeProps extends BlockNodeProps {}
