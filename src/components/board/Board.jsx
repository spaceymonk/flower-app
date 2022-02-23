import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { Background, MiniMap, Controls, ControlButton } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMap as filledMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as emptyMap } from '@fortawesome/free-regular-svg-icons';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';

function Board({ height, width }) {
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
  const [sidebarToggled, setSidebarToggled] = React.useState(false);
  const handleSidebarClose = () => setSidebarToggled(false);
  const handleSidebarOpen = () => setSidebarToggled(true);

  return (
    <div className="position-relative">
      <Button
        className="position-absolute px-0 py-0 border-0 rounded-circle top-0 end-0 m-3 align-items-center"
        variant="outline-dark"
        onClick={handleSidebarOpen}
        style={{ zIndex: 5 }}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='2x' />
      </Button>
      <Sidebar show={sidebarToggled} onClose={handleSidebarClose} />
      <div style={{ height: height + 'px', width: width + 'px' }}>
        <ReactFlow snapToGrid snapGrid={[25, 25]}>
          <Background />
          <MiniMap style={{ display: minimapToggled ? 'initial' : 'none' }} />
          <Controls showInteractive={false} showZoom={false}>
            <ControlButton onClick={handleMinimapVisibility}>{minimapIcon}</ControlButton>
          </Controls>
        </ReactFlow>
      </div>
    </div>
  );
}

export default Board;
