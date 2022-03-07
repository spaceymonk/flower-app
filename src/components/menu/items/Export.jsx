import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Button, Container } from 'react-bootstrap';

export function ExportModal({ show, onClose }) {
  function handleExport() { }

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faFileExport} /> Export Project
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Container></Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={handleExport}>
          Export
        </Button>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ExportMenuItem() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <ExportModal show={show} onClose={() => setShow(false)} />
      <NavDropdown.Item onClick={() => setShow(true)}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faFileExport} /> Export
      </NavDropdown.Item>
    </>
  );
}
