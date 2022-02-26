import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, Offcanvas, Tooltip } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import CustomOverlay from '../common/CustomOverlay';


function WatchSidebar() {
  const [sidebarActive, setSidebarActive] = React.useState(false);
  const handleSidebarClose = () => setSidebarActive(false);
  const handleSidebarOpen = () => setSidebarActive(true);

  return (
    <>
      <CustomOverlay placement="bottom" overlay={<Tooltip>{T.watchesSidebar.tooltip}</Tooltip>}>
        <Button onClick={handleSidebarOpen}>
          <FontAwesomeIcon icon={faGlasses} />
        </Button>
      </CustomOverlay>

      <Offcanvas show={sidebarActive} onHide={handleSidebarClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{T.watchesSidebar.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta esse unde totam, iusto rerum necessitatibus
          aperiam expedita dolor aspernatur voluptas?
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default WatchSidebar;
