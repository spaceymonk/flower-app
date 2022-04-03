import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import { useAppContext } from '../../../providers/AppProvider';
import PropTypes from 'prop-types';

export function InputSelectModal({ show, onClose }: InputSelectModalProps) {
  const { getInputParams, setInputParams } = useAppContext();
  const [text, setText] = React.useState(getInputParams());

  const handleSave = () => {
    setInputParams(text);
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
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') handleSave();
            }}
            placeholder="Input parameters"
          />
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

InputSelectModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export interface InputSelectModalProps extends PropTypes.InferProps<typeof InputSelectModal.propTypes> {}

export function InputSelectMenuItem() {
  const [show, toggleShow] = useToggle();
  return (
    <>
      <InputSelectModal show={show} onClose={toggleShow} />
      <NavDropdown.Item onClick={toggleShow}>
        <FontAwesomeIcon size="sm" className="me-2" icon={faEnvelopeOpenText} /> Input Parameters
      </NavDropdown.Item>
    </>
  );
}
