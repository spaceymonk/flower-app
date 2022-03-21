import { faFolder, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import InitialValues from '../../../config/InitialValues';
import { BlockService } from '../../../services/BlockService';
import { toast } from 'react-toastify';
import useToggle from '../../../hooks/useToggle';
import useOpen from '../../../hooks/project/useOpen';
import useLoad from '../../../hooks/project/useLoad';

export function OpenModal({ show, onClose }) {
  const [file, setFile] = React.useState(null);
  const open = useOpen();
  const load = useLoad();

  function handleOpen() {
    try {
      open(file);
      BlockService.instance().fitView();
      setFile(null);
      onClose();
      toast.success('Project opened, do not forget to save!');
    } catch (e) {
      toast.error('Project could not open!');
    }
  }
  function handleRestoreCheckpoint() {
    try {
      load(InitialValues.defaultEdges, InitialValues.defaultNodes, InitialValues.title, InitialValues.inputParams);
      BlockService.instance().fitView();
      onClose();
      toast.success('Last save restored!');
    } catch (e) {
      toast.error('Something went wrong!');
    }
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
            <Form.Label>Select from computer:</Form.Label>
            <Form.Control type="file" accept=".json" onChange={(event) => setFile(event.target.files[0])} />
          </Form.Group>
          <div className="mt-3  text-center">
            <p className="text-muted">or</p>
            <Button variant="secondary" onClick={handleRestoreCheckpoint}>
              <FontAwesomeIcon icon={faRotateBack} className="me-2" />
              Load last checkpoint
            </Button>
          </div>
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
  const [show, toggleShow] = useToggle();
  return (
    <>
      <OpenModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faFolder} /> Open
      </NavDropdown.Item>
    </>
  );
}
