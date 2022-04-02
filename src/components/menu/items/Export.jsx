import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Button, Container } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { AppContext } from '../../../providers/AppProvider';
import { toast } from 'react-toastify';

export function ExportModal({ show, onClose }) {
  const { getTitle } = React.useContext(AppContext);

  async function handleExport() {
    try {
      const blob = await domtoimage.toBlob(document.getElementById('board'), { bgcolor: '#fff' });
      FileSaver.saveAs(blob, getTitle() + '.png');
    } catch {
      toast.error('Error exporting image');
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
          <Button onClick={handleExport}>Export Current View to PNG</Button>
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
