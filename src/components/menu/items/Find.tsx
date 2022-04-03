import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Container, Button } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';

export function FindModal({ show, onClose }: FindModalProps) {
  function handleFind() { }

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
}

FindModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface FindModalProps extends PropTypes.InferProps<typeof FindModal.propTypes> {}

export function FindMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <FindModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faSearch} /> Find
      </NavDropdown.Item>
    </>
  );
}
