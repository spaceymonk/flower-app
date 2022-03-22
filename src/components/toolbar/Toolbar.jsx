import React from 'react';
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import BlockSidebar from './items/BlockSidebar';
import WatchSidebar from './items/WatchSidebar';
import SimulationControls from './items/SimulationControls';

const Toolbar = React.forwardRef(function (props, ref) {
  return (
    <div ref={ref} className="overflow-auto">
      <ButtonToolbar className="bg-light border border-1 p-1" style={{ minWidth: '100%', width: 'max-content' }}>
        <SimulationControls />
        <ButtonGroup size="sm" className="ms-auto">
          <BlockSidebar />
          <WatchSidebar />
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
});

export default Toolbar;
