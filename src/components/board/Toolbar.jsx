import { faArrowDown, faForwardStep, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Tooltip } from 'react-bootstrap';
import BlockSidebar from './BlockSidebar';
import WatchSidebar from './WatchSidebar';
import CustomOverlay from '../common/CustomOverlay';
import { SimulationContext } from '../../providers/SimulationProvider';
import useSimulation from '../../hooks/useSimulation';
import useToggle from '../../hooks/useToggle';

const Toolbar = React.forwardRef(function (props, ref) {
  const simulation = useSimulation();
  const { isRunning } = React.useContext(SimulationContext);
  const [pauseIcon, togglePauseIcon] = useToggle();

  const handlePlayBtn = () => simulation.start();
  const handleStopBtn = () => simulation.stop();
  const handleNextBtn = () => simulation.next();
  const handleContinueBtn = () => {
    togglePauseIcon();
    simulation.continueFn();
  };

  React.useEffect(() => {
    if (!isRunning()) {
      togglePauseIcon(false);
    }
  }, [isRunning, togglePauseIcon]);

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
              <FontAwesomeIcon icon={pauseIcon ? faPause : faForwardStep} />
            </Button>
          </CustomOverlay>

          <CustomOverlay overlay={<Tooltip>Next Block</Tooltip>}>
            <Button variant="secondary" disabled={!isRunning() || pauseIcon} onClick={handleNextBtn}>
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
