import { faArrowRight, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Tooltip } from 'react-bootstrap';
import BlockSidebar from './BlockSidebar';
import WatchSidebar from './WatchSidebar';
import CustomOverlay from '../common/CustomOverlay';

const Toolbar = React.forwardRef(function (props, ref) {
  return (
    <div ref={ref} className="overflow-auto">
      <ButtonToolbar className="bg-light border border-1 p-1" style={{ minWidth: '100%', width: 'max-content' }}>
        <ButtonGroup size="sm">
          <CustomOverlay overlay={<Tooltip>Run/Debug</Tooltip>}>
            <Button variant="success">
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Next Block</Tooltip>}>
            <Button variant="warning" disabled>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Stop</Tooltip>}>
            <Button variant="danger" disabled>
              <FontAwesomeIcon icon={faStop} />
            </Button>
          </CustomOverlay>
        </ButtonGroup>
        <ButtonGroup size="sm" className="ms-auto">
          <BlockSidebar />
          <WatchSidebar />
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
});

export default Toolbar;
