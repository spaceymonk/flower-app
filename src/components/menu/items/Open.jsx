import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import { AppContext } from '../../../pages/App';
import { ProjectService } from '../../../services/ProjectService';

export function OpenModal({ show, onClose }) {
  const { setTitle, setInputParams, showToast } = React.useContext(AppContext);
  const [file, setFile] = React.useState();

  function handleOpen() {
    ProjectService.open({ setTitle, setInputParams }, file);
    showToast({ title: 'Project opened, do not forget to save!' });
    onClose();
  }

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faFolder} /> Open Project
        </h4>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form.Group controlId="formFile">
            <Form.Label>Select from computer...</Form.Label>
            <Form.Control type="file" accept=".json" onChange={(event) => setFile(event.target.files[0])} />
          </Form.Group>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={handleOpen}>
          Open
        </Button>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function OpenMenuItem() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <OpenModal show={show} onClose={() => setShow(false)} />
      <NavDropdown.Item onClick={() => setShow(true)}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faFolder} /> Open
      </NavDropdown.Item>
    </>
  );
}
