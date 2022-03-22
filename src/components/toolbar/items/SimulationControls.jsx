import React from 'react';
import { Button, ButtonGroup, Form, Tooltip } from 'react-bootstrap';
import { faArrowDown, faForwardStep, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomOverlay from '../../common/CustomOverlay';
import { SimulationContext } from '../../../providers/SimulationProvider';
import useSimulation from '../../../hooks/service/useSimulation';
import useToggle from '../../../hooks/useToggle';

const SimulationControls = () => {
  const simulation = useSimulation();
  const { isRunning } = React.useContext(SimulationContext);
  const [pauseIcon, togglePauseIcon] = useToggle();
  const [simulationSpeed, setSimulationSpeed] =React.useState(simulation.getSpeedInMs());

  const handlePlayBtn = () => simulation.start();
  const handleStopBtn = () => simulation.stop();
  const handleNextBtn = () => simulation.next();
  const handleContinueBtn = () => {
    togglePauseIcon();
    simulation.continueFn();
  };
  const handleSimulationSpeedChange = (e) => {
    setSimulationSpeed(e.target.value);
    simulation.setSpeedInMs(e.target.value);
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
