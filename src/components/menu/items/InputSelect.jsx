import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import { ProjectService } from '../../../services/ProjectService';

export function InputSelectModal({ show, onClose }) {
  const textRef = React.useRef();

  const handleSave = () => {
    ProjectService.data.inputParams = textRef.current.value;
    onClose();
  };

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faEnvelopeOpenText} /> Input Parameters
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Container>
          <Form.Label className="mb-3">Enter input parameters of the project:</Form.Label>
          <Form.Control
            as="textarea"
            ref={textRef}
            rows={6}
            defaultValue={ProjectService.data.inputParams}
            placeholder="Input parameters" />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function InputSelectMenuItem() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <InputSelectModal show={show} onClose={() => setShow(false)} />
      <NavDropdown.Item onClick={() => setShow(true)}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faEnvelopeOpenText} /> Input Parameters
      </NavDropdown.Item>
    </>
  );
}
