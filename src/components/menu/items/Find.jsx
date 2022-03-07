import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Button } from 'react-bootstrap';

export const FindModal = ({ show, onClose }) => {
  function handleFind() {}

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faSearch} /> Find
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Container></Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" size="sm" onClick={handleFind}>
          Find
        </Button>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export function FindMenuItem() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <FindModal show={show} onClose={() => setShow(false)} />
      <NavDropdown.Item onClick={() => setShow(true)}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faSearch} /> Find
      </NavDropdown.Item>
    </>
  );
}
