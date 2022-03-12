import { faArrowDown, faForwardStep, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Tooltip } from 'react-bootstrap';
import BlockSidebar from './BlockSidebar';
import WatchSidebar from './WatchSidebar';
import CustomOverlay from '../common/CustomOverlay';
import { AppContext } from '../../pages/App';

const Toolbar = React.forwardRef(function (props, ref) {
  const { setRunning, isRunning } = React.useContext(AppContext);
  const handlePlayBtn = () => setRunning(true);
  const handleStopBtn = () => setRunning(false);

  return (
    <div ref={ref} className="overflow-auto">
      <ButtonToolbar className="bg-light border border-1 p-1" style={{ minWidth: '100%', width: 'max-content' }}>
        <ButtonGroup size="sm">
          <CustomOverlay overlay={<Tooltip>Run/Debug</Tooltip>}>
            <Button variant="success" disabled={isRunning()} onClick={handlePlayBtn}>
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Continue</Tooltip>}>
            <Button variant="secondary" disabled={!isRunning()}>
              <FontAwesomeIcon icon={faForwardStep} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Next Block</Tooltip>}>
            <Button variant="secondary" disabled={!isRunning()}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Stop</Tooltip>}>
            <Button variant="danger" disabled={!isRunning()} onClick={handleStopBtn}>
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
