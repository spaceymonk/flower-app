import React from 'react';
import ReactFlow, { useReactFlow } from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap as filledMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as emptyMap } from '@fortawesome/free-regular-svg-icons';
import { nodeTypes, BlockModalContainer } from '../blocks';
import { BlockService } from '../../services/BlockService';
import { AppContext } from '../../pages/App';

const alertUser = (e) => {
  e.preventDefault();
  e.returnValue = '';
};

function Board({ height }) {
  BlockService.instance(useReactFlow());

  const [minimapIcon, setMinimapIcon] = React.useState(<FontAwesomeIcon icon={filledMap} />);
  const [minimapToggled, setMinimapToggled] = React.useState(true);
  const handleMinimapVisibility = () => {
    if (minimapToggled === false) {
      setMinimapIcon(<FontAwesomeIcon icon={filledMap} />);
      setMinimapToggled(true);
    } else {
      setMinimapIcon(<FontAwesomeIcon icon={emptyMap} />);
      setMinimapToggled(false);
    }
  };

  const [dblClkNode, setDblClkNode] = React.useState(null);
  function handleNodeDoubleClick(event, node) {
    setDblClkNode(node);
  }

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const { getDefaultEdges, getDefaultNodes } = React.useContext(AppContext);
  return (
    <>
      <div style={{ height: height + 'px', width: '100%' }}>
        <ReactFlow
          defaultNodes={getDefaultNodes()}
          defaultEdges={getDefaultEdges()}
          fitView={true}
          nodeTypes={nodeTypes}
          onNodeDoubleClick={handleNodeDoubleClick}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Control"
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
