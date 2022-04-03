import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Container, Table, Button } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';

export function StatisticsModal({ show, onClose }: StatisticsModalProps) {
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

StatisticsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface StatisticsModalProps extends PropTypes.InferProps<typeof StatisticsModal.propTypes> {}

export const StatisticsMenuItem = () => {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <StatisticsModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faInfoCircle} /> Statistics
      </NavDropdown.Item>
    </>
  );
};
