import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Offcanvas, Tooltip } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import CustomOverlay from '../common/CustomOverlay';
import {
  DecisionBlockCreateButton,
  StatementBlockCreateButton,
  StartBlockCreateButton,
  StopBlockCreateButton,
  LoadBlockCreateButton,
  StoreBlockCreateButton,
} from '../blocks';
import { AppContext } from '../../pages/App';

function BlockSidebar() {
  const { isRunning } = React.useContext(AppContext);
  const [sidebarActive, setSidebarActive] = React.useState(false);
  const handleSidebarClose = () => setSidebarActive(false);
  const handleSidebarOpen = () => setSidebarActive(true);

  return (
    <>
      <CustomOverlay overlay={<Tooltip>{T.blockSidebar.tooltip}</Tooltip>}>
        <Button onClick={handleSidebarOpen} disabled={isRunning()}>
          <FontAwesomeIcon icon={faAdd} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={sidebarActive} onHide={handleSidebarClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.blockSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <StartBlockCreateButton className="mb-3" />
          <StopBlockCreateButton className="mb-3" />
          <StatementBlockCreateButton className="mb-3" />
          <DecisionBlockCreateButton className="mb-3" />
          <LoadBlockCreateButton className="mb-3" />
          <StoreBlockCreateButton className="mb-3" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BlockSidebar;
