import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { nodeTypes, BlockModalContainer } from '../blocks';
import useMinimapToggle from '../../hooks/useMinimapToggle';
import usePaneLock from '../../hooks/usePaneLock';
import useEdgeService from '../../hooks/service/useEdgeService.js';
import { AppContext } from '../../providers/AppProvider';
import { CustomConnectionLine, edgeTypes } from '../edges';

function Board({ height }) {
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();
  const { getNodes, getEdges, onNodesChange, onEdgesChange } = React.useContext(AppContext);
  const { onConnect, onEdgeUpdate } = useEdgeService();

  const [dblClkNode, setDblClkNode] = React.useState(null);
  const handleNodeDoubleClick = (event, node) => setDblClkNode(node);

  const nodes = React.useMemo(getNodes, [getNodes]);
  const edges = React.useMemo(getEdges, [getEdges]);

  return (
    <>
      <div id="board" style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
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
            <ControlButton onClick={handleMinimapVisibility}>{minimapIcon}</ControlButton>
          </Controls>
        </ReactFlow>
      </div>
      <BlockModalContainer node={dblClkNode} />
    </>
  );
}

export default Board;
