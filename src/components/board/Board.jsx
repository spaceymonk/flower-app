import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap as filledMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as emptyMap } from '@fortawesome/free-regular-svg-icons';

function Board({ height, showToast }) {
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

  return (
    <div style={{ height: height + 'px', width: '100%' }}>
      <ReactFlow snapToGrid snapGrid={[25, 25]}>
        <Background />
        <MiniMap style={{ display: minimapToggled ? 'initial' : 'none' }} />
        <Controls showInteractive={false} showZoom={false}>
          <ControlButton onClick={handleMinimapVisibility}>{minimapIcon}</ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default Board;
