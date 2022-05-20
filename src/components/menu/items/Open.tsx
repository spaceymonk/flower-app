import { faFolder, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import LocalStorageManager from '../../../config/LocalStorageManager';
import { toast } from 'react-toastify';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import { throwErrorIfNull } from '../../../util';
import { ProjectData } from '../../../types';
import { useSimulationContext } from '../../../providers/SimulationProvider';
import { useServiceContext } from '../../../providers/ServiceProvider';

export function OpenModal({ show, onClose }: OpenModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const {projectService, canvasFacade} = useServiceContext();

  const handleFileSelection = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (file) {
      setFile(file);
    } else {
      toast.warn('No file selected.');
    }
  };

  function handleOpen() {
    try {
      projectService.open(throwErrorIfNull(file, 'File could not opened!'), (content: ProjectData) => {
        projectService.load(content);
        toast.success('Project loaded!');
      });
      canvasFacade.fitView();
      setFile(null);
      onClose();
    } catch (e) {
      toast.error('Project could not open!');
    }
  }
  function handleRestoreCheckpoint() {
    try {
      projectService.load(LocalStorageManager.get());
      canvasFacade.fitView();
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
            <Form.Control type="file" accept=".json" onChange={handleFileSelection} />
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

OpenModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface OpenModalProps extends PropTypes.InferProps<typeof OpenModal.propTypes> {}

export function OpenMenuItem() {
  const [show, toggleShow] = useToggle();
  const { isRunning } = useSimulationContext();
  return (
    <>
      <OpenModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow} disabled={isRunning()}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faFolder} /> Open
      </NavDropdown.Item>
    </>
  );
}
