import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Table, Button } from 'react-bootstrap';

export function StatisticsModal({ show, onClose }) {
  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faInfoCircle} /> Statistics
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-2">
        <Container>
          <Table responsive striped></Table>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export const StatisticsMenuItem = () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <StatisticsModal show={show} onClose={() => setShow(false)} />
      <NavDropdown.Item onClick={() => setShow(true)}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faInfoCircle} /> Statistics
      </NavDropdown.Item>
    </>
  );
};
