import { faArrowDown, faForwardStep, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Tooltip } from 'react-bootstrap';
import BlockSidebar from './BlockSidebar';
import WatchSidebar from './WatchSidebar';
import CustomOverlay from '../common/CustomOverlay';
import { AppContext } from '../../pages/App';
import { SimulationService } from '../../services/SimulationService';

const Toolbar = React.forwardRef(function (props, ref) {
  const { setRunning, isRunning } = React.useContext(AppContext);
  const [contToggled, setContToggle] = React.useState(false);

  const handlePlayBtn = () => {
    const cleaner = () => {
      setRunning(false);
      setContToggle(false);
    };
    setRunning(true);
    setContToggle(false);
    SimulationService.instance().start(cleaner);
  };
  const handleStopBtn = () => {
    setRunning(false);
    SimulationService.instance().stop();
  };
  const handleContinueBtn = () => {
    setContToggle(!contToggled);
    SimulationService.instance().continue();
  };
  const handleNextBtn = () => SimulationService.instance().next();

  return (
    <div ref={ref} className="overflow-auto">
      <ButtonToolbar className="bg-light border border-1 p-1" style={{ minWidth: '100%', width: 'max-content' }}>
        <ButtonGroup size="sm">
          <CustomOverlay overlay={<Tooltip>Run/Debug</Tooltip>}>
            <Button variant="success" disabled={isRunning()} onClick={handlePlayBtn}>
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Continue/Pause</Tooltip>}>
            <Button variant="secondary" disabled={!isRunning()} onClick={handleContinueBtn}>
              <FontAwesomeIcon icon={contToggled ? faPause : faForwardStep} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Next Block</Tooltip>}>
            <Button variant="secondary" disabled={!isRunning() || contToggled} onClick={handleNextBtn}>
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
