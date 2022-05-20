import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Offcanvas, Tooltip } from 'react-bootstrap';
import T from '../../../config/MessageConstants';
import CustomOverlay from '../../common/CustomOverlay';
import * as BlockCreateButtons from '../../blocks/button';
import useToggle from '../../../hooks/useToggle';
import { useSimulationContext } from '../../../providers/SimulationProvider';

function BlockSidebar() {
  const { isRunning } = useSimulationContext();
  const [showSidebar, toggleSidebar] = useToggle();

  return (
    <>
      <CustomOverlay overlay={<Tooltip>{T.blockSidebar.tooltip}</Tooltip>}>
        <Button onClick={toggleSidebar} disabled={isRunning()}>
          <FontAwesomeIcon icon={faAdd} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.blockSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <BlockCreateButtons.StartBlockCreateBtn />
          <BlockCreateButtons.StopBlockCreateBtn />
          <BlockCreateButtons.StatementBlockCreateBtn />
          <BlockCreateButtons.DecisionBlockCreateBtn />
          <BlockCreateButtons.LoadBlockCreateBtn />
          <BlockCreateButtons.StoreBlockCreateBtn />
          <BlockCreateButtons.WhileLoopBlockCreateBtn />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BlockSidebar;
