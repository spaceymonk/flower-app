import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { nodeTypes, BlockModalContainer } from '../blocks';
import useMinimapToggle from '../../hooks/useMinimapToggle';
import usePaneLock from '../../hooks/usePaneLock';
import useBlockService from '../../hooks/service/useBlockService.js'
import useEdgeService from '../../hooks/service/useEdgeService.js'
import { AppContext } from '../../providers/AppProvider';

function Board({ height }) {
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();
  const { getNodes, getEdges } = React.useContext(AppContext);
  const { onNodesChange } = useBlockService();
  const { onEdgesChange, onConnect } = useEdgeService();

  const [dblClkNode, setDblClkNode] = React.useState(null);
  const handleNodeDoubleClick = (event, node) => setDblClkNode(node);

  return (
    <>
      <div id="board" style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          nodes={getNodes()}
          edges={getEdges()}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView={true}
          nodeTypes={nodeTypes}
          onNodeDoubleClick={handleNodeDoubleClick}
          connectionLineType='smoothstep'
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Control"
          {...paneLockConfigs}
        >
          <Background />
          <MiniMap style={{ display: minimapToggled ? 'initial' : 'none' }} />
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
