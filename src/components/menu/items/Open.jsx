import { faFolder, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import { AppContext, initials } from '../../../pages/App';
import { BlockService } from '../../../services/BlockService';
import { ProjectService } from '../../../services/ProjectService';
import { toast } from 'react-toastify';

export function OpenModal({ show, onClose }) {
  const { setTitle, setInputParams } = React.useContext(AppContext);
  const [file, setFile] = React.useState(null);

  function handleOpen() {
    try {
      ProjectService.open({ setTitle, setInputParams }, file);
      BlockService.instance().fitView();
      setFile(null);
      onClose();
      toast.success('Project opened, do not forget to save!');
    } catch (e) {
      toast.error('File could not be opened!', e.message);
    }
  }
  function handleRestoreCheckpoint() {
    setTitle(initials.title);
    BlockService.instance().setNodes(initials.defaultNodes);
    BlockService.instance().setEdges(initials.defaultEdges);
    setInputParams(initials.inputParams);
    BlockService.instance().fitView();
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
