import React from 'react';
import { BlockView, BlockNodeProps } from './BlockView';
import { ResizableBox } from 'react-resizable';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function ContainerBlockView({ block, ...props }: ContainerNodeProps) {
  const { blockService, blockRepository, canvasFacade } = useServiceContext();

  const [minSize, setMinSize] = React.useState<[number, number]>([200, 200]);
  const childBlocks = React.useMemo(() => blockRepository.findAllByParentNodeId(block.id), [block.id, blockRepository]);
  const zoom = React.useMemo(() => canvasFacade.getViewport().zoom, [canvasFacade]);

  const calcMinSize = React.useCallback((): [number, number] => {
    let [minWidth, minHeight] = [200, 200];
    childBlocks.forEach((childBlock) => {
      minWidth = Math.max(minWidth, childBlock.position.x + childBlock.width + 15);
      minHeight = Math.max(minHeight, childBlock.position.y + childBlock.height + 15);
    });
    return [minWidth, minHeight];
  }, [childBlocks]);

  const handleResizeStart = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setMinSize(calcMinSize());
    },
    [calcMinSize]
  );
  const handleResize = React.useCallback(
    (e: React.SyntheticEvent, { size }) => {
      blockService.update(block.id, { width: size.width, height: size.height });
    },
    [block.id, blockService]
  );

  React.useEffect(() => {
    const [minWidth, minHeight] = calcMinSize();
    if (minWidth > minSize[0] || minHeight > minSize[1]) {
      setMinSize([minWidth, minHeight]);
      if (block.width < minWidth) {
        blockService.update(block.id, { width: minWidth });
      }
      if (block.height < minHeight) {
        blockService.update(block.id, { height: minHeight });
      }
    }
  }, [block.height, block.id, block.width, blockService, calcMinSize, childBlocks, minSize]);

  return (
    <ResizableBox
      // @ts-ignore: invalid @types/react-resizable package
      transformScale={zoom}
      width={block.width}
      height={block.height}
      minConstraints={minSize}
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
