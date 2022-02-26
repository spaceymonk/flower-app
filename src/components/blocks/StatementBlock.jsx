import React from 'react';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useReactFlow, Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';

export function NodeModal({ show, onSave, onClose, textAreaRef }) {
  return (
    <Modal show={show} size="md" centered>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control as="textarea" rows={3} ref={textAreaRef} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={onSave}>
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function NodeComponent({ data }) {
  const processed = data.text; //todo: handle special keywords by bolding them etc.

  return (
    <div className="d-flex node node-statement">
      <Handle type="target" position={Position.Top} className="handle" style={{ backgroundColor: 'blueviolet' }} />
      <div className="align-self-center" style={{ whiteSpace: 'pre-wrap' }}>
        {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
        {processed}
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" style={{ backgroundColor: 'blueviolet' }} />
    </div>
  );
}

export function CreateButton({ className, showToast }) {
  const { setNodes, getNodes, getViewport } = useReactFlow();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const node = create(pos);
      setNodes(getNodes().concat(node));
      showToast(T.blocks.statement.toastMsg);
    } catch {
      showToast({ title: T.blocks.errorTxt });
    }
  }

  return (
    <Card className={'small user-select-none clickable ' + className} onClick={handleClick}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon icon={faCode} />
          {T.blocks.statement.title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-muted">{T.blocks.statement.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function create(pos) {
  return {
    id: uuid(),
    type: 'statement',
    position: pos,
    data: {},
  };
}
