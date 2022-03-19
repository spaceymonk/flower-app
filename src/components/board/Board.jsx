import React from 'react';
import ReactFlow, { useReactFlow } from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { nodeTypes, BlockModalContainer } from '../blocks';
import { BlockService } from '../../services/BlockService';
import { AppContext } from '../../pages/App';
import useAlert from '../../hooks/useAlert';
import useMinimapToggle from '../../hooks/useMinimapToggle';
import usePaneLock from '../../hooks/usePaneLock';

function Board({ height }) {
  BlockService.instance(useReactFlow());

  useAlert();
  const { getDefaultEdges, getDefaultNodes } = React.useContext(AppContext);
  const paneLockConfigs = usePaneLock();
  const { minimapToggled, minimapIcon, handleMinimapVisibility } = useMinimapToggle();

  const [dblClkNode, setDblClkNode] = React.useState(null);
  function handleNodeDoubleClick(event, node) {
    setDblClkNode(node);
  }

  return (
    <>
      <div id="board" style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          defaultNodes={getDefaultNodes()}
          defaultEdges={getDefaultEdges()}
          fitView={true}
          nodeTypes={nodeTypes}
          onNodeDoubleClick={handleNodeDoubleClick}
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
