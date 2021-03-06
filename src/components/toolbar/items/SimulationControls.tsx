import React from 'react';
import { Button, ButtonGroup, Form, Tooltip } from 'react-bootstrap';
import { faArrowDown, faForwardStep, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomOverlay from '../../common/CustomOverlay';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import { useServiceContext } from '../../../providers/ServiceProvider';

const SimulationControls = () => {
  const { simulationControllerService } = useServiceContext();
  const { isRunning, getSpeedInMs, setSpeedInMs } = useSimulationContext();
  const [pauseIcon, togglePauseIcon] = React.useState(false);
  const [simulationSpeed, setSimulationSpeed] = React.useState(getSpeedInMs());

  const handlePlayBtn = () => simulationControllerService.start();
  const handleStopBtn = () => simulationControllerService.stop();
  const handleNextBtn = () => simulationControllerService.next();
  const handleContinueBtn = () => {
    togglePauseIcon((s) => !s);
    simulationControllerService.resume();
  };
  const handleSimulationSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = parseInt(e.target.value, 10);
    setSimulationSpeed(speed);
    setSpeedInMs(speed);
  };

  React.useEffect(() => {
    if (!isRunning()) {
      togglePauseIcon(false);
    }
  }, [isRunning, togglePauseIcon]);

  return (
    <>
      <ButtonGroup size="sm">
        <CustomOverlay overlay={<Tooltip>Run/Debug</Tooltip>}>
          <Button variant="success" disabled={isRunning()} onClick={handlePlayBtn} aria-label="Play">
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </CustomOverlay>

        <CustomOverlay overlay={<Tooltip>Continue/Pause</Tooltip>}>
          <Button variant="secondary" disabled={!isRunning()} onClick={handleContinueBtn} aria-label="Continue / Pause">
            <FontAwesomeIcon icon={pauseIcon ? faPause : faForwardStep} />
          </Button>
        </CustomOverlay>

        <CustomOverlay overlay={<Tooltip>Next Block</Tooltip>}>
          <Button variant="secondary" disabled={!isRunning() || pauseIcon} onClick={handleNextBtn} aria-label="Next">
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </CustomOverlay>

        <CustomOverlay overlay={<Tooltip>Stop</Tooltip>}>
          <Button variant="danger" disabled={!isRunning()} onClick={handleStopBtn} aria-label="stop">
            <FontAwesomeIcon icon={faStop} />
          </Button>
        </CustomOverlay>
      </ButtonGroup>

      {isRunning() && (
        <CustomOverlay overlay={<Tooltip>Simulation tick per {simulationSpeed} ms</Tooltip>}>
          <Form.Range
            className="mx-4 align-self-center w-25"
            min={100}
            max={1000}
            defaultValue={simulationSpeed}
            onChange={handleSimulationSpeedChange}
          />
        </CustomOverlay>
      )}
    </>
  );
};

export default SimulationControls;
