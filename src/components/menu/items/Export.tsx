import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Modal, Button, Container } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useProjectHelper } from '../../../hooks/useProjectHelper';
import { ExportType } from '../../../types';

export function ExportModal({ show, onClose }: ExportModalProps) {
  const { toPNG, toCode } = useProjectHelper();

  async function handleExport(type: ExportType) {
    try {
      if (type === ExportType.PNG) {
        toPNG();
      } else if (type === ExportType.CODE) {
        toCode();
      }
    } catch {
      toast.error('Export failed!');
    }
  }

  return (
    <Modal show={show} size="lg" centered onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faFileExport} /> Export Project
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Container>
          <Button onClick={() => handleExport(ExportType.PNG)}>Export Current View to PNG</Button>
          <Button onClick={() => handleExport(ExportType.CODE)}>Generate Source Code</Button>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ExportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface ExportModalProps extends PropTypes.InferProps<typeof ExportModal.propTypes> {}

export function ExportMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <ExportModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faFileExport} /> Export
      </NavDropdown.Item>
    </>
  );
}
