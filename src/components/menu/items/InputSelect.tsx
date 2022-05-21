import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavDropdown, Modal, Container, Form, Button } from 'react-bootstrap';
import useToggle from '../../../hooks/useToggle';
import { useAppContext } from '../../../providers/AppProvider';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';

import './styles.css';

const hightlightWithLineNumbers = (input: string) =>
  input
    .split('\n')
    .map((line: string, i: number) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n');

export function InputSelectModal({ show, onClose }: InputSelectModalProps) {
  const { getInputParams, setInputParams } = useAppContext();
  const [text, setText] = React.useState(getInputParams());

  const handleSave = () => {
    setInputParams(text);
    onClose();
  };

  const handleClose = () => {
    setText(getInputParams());
    onClose();
  };

  React.useEffect(() => {
    setText(getInputParams());
  }, [getInputParams]);

  return (
    <Modal show={show} size="lg" centered onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <h4>
          <FontAwesomeIcon size="lg" className="me-2" icon={faEnvelopeOpenText} /> Input Parameters
        </h4>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <Container>
          <Form.Label className="mb-3">Enter input parameters of the project:</Form.Label>
          <Editor
            value={text}
            onValueChange={(code) => setText(code)}
            highlight={(code) => hightlightWithLineNumbers(code)}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') handleSave();
            }}
            padding={10}
            textareaId="codeArea"
            className="editor"
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button variant="primary" size="sm" onClick={handleClose}>
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
