import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { nodeTypes, BlockModalContainer } from '../blocks';
import useMinimapToggle from '../../hooks/useMinimapToggle';
import usePaneLock from '../../hooks/usePaneLock';
import useEdgeHelper from '../../hooks/useEdgeHelper';
import { CustomConnectionLine, edgeTypes } from '../edges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useAppContext } from '../../providers/AppProvider';
import { Block } from '../../types';

function Board({ height }: PropTypes.InferProps<typeof Board.propTypes>) {
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();
  const { getBlocks, getEdges, onBlocksChange, onEdgesChange } = useAppContext();
  const { onConnect, onEdgeUpdate } = useEdgeHelper();

  const [dblClkNode, setDblClkNode] = React.useState<Block | null>(null);
  const handleNodeDoubleClick = (event: any, block: Block) => setDblClkNode(block);

  const blocks = React.useMemo(getBlocks, [getBlocks]);
  const edges = React.useMemo(getEdges, [getEdges]);

  return (
    <>
      <div id="board" style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          nodes={blocks}
          edges={edges}
          onNodesChange={onBlocksChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          fitView={true}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeDoubleClick={handleNodeDoubleClick}
          connectionLineComponent={CustomConnectionLine}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Control"
          {...paneLockConfigs}
        >
          <Background />
          {minimapToggled && <MiniMap />}
          <Controls showInteractive={false} showZoom={false}>
            <ControlButton onClick={handleMinimapVisibility}>
              <FontAwesomeIcon icon={minimapIcon}></FontAwesomeIcon>
            </ControlButton>
          </Controls>
        </ReactFlow>
      </div>
      <BlockModalContainer block={dblClkNode} />
    </>
  );
}

Board.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Board;
