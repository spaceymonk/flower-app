import { faExternalLink, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Tooltip } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import PropTypes from 'prop-types';
import CustomOverlay from '../../common/CustomOverlay';
import html from '../../../config/HowToText';

import './HowTo.css';

export function HowToModal({ show, onClose }: HowToModalProps) {
  return (
    <Modal id="how-to-modal" show={show} size="lg" centered scrollable onHide={onClose}>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faQuestionCircle} /> How To Use
        </h4>
      </Modal.Header>
      <Modal.Body>
        <iframe title="How To" width="100%" height="95%" src={'data:text/html;base64,' + html} />
      </Modal.Body>
      <Modal.Footer>
        <CustomOverlay overlay={<Tooltip>Open in new tab</Tooltip>}>
          <Button variant="info" className="me-auto" target="_blank" href={process.env.PUBLIC_URL + '/how-to.html'}>
            <FontAwesomeIcon icon={faExternalLink} />
          </Button>
        </CustomOverlay>
        <Button variant="primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

HowToModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface HowToModalProps extends PropTypes.InferProps<typeof HowToModal.propTypes> {}

export function HowToMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <HowToModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faQuestionCircle} /> How to Use
      </NavDropdown.Item>
    </>
  );
}
