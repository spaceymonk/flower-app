import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

export function InputModal({ variableName, onClose, onSubmit, show }: InputModalProps) {
  const [input, setInput] = React.useState('');

  const handleSubmit = () => {
    onSubmit(input);
    onClose();
  };
  const handleCancel = () => {
    onSubmit(null);
    onClose();
  };

  React.useEffect(() => {
    setInput('');
  }, [show]);

  return (
    <Modal show={show} centered scrollable>
      <Modal.Header>
        <Modal.Title>Input</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text className="fw-bold">{variableName}</InputGroup.Text>
          <Form.Control
            placeholder={'Enter text'}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') handleSubmit();
            }}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

InputModal.propTypes = {
  variableName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export interface InputModalProps extends PropTypes.InferProps<typeof InputModal.propTypes> {}
