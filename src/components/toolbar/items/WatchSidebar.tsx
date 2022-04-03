import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Button, Offcanvas, Tooltip } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import CustomOverlay from '../../common/CustomOverlay';
import useToggle from '../../../hooks/useToggle';
import { useSimulationContext } from '../../../providers/SimulationProvider';

function WatchSidebar() {
  const { isRunning } = useSimulationContext();
  const [showSidebar, toggleSidebar] = useToggle();

  return (
    <>
      <CustomOverlay placement="bottom" overlay={<Tooltip>{T.watchesSidebar.tooltip}</Tooltip>}>
        <Button onClick={toggleSidebar} disabled={!isRunning()}>
          <FontAwesomeIcon icon={faGlasses} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.watchesSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default WatchSidebar;
