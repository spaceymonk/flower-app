import React from 'react';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useReactFlow, Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';

export function NodeModal({ show, onSave, onClose, node }) {
  const textAreaRef = React.useRef(null);

  function handleSave() {
    node.data.text = textAreaRef.current.value;
    onSave(node);
  }

  return (
    <Modal show={show} size="md" centered>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>{T.blocks.decision.label}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            ref={textAreaRef}
            defaultValue={node?.data?.text}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') handleSave();
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={handleSave}>
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
    <div className="d-flex node node-decision">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="decision-fields false">F</div>
      <div className='w-100'>
        <div className="header">IF</div>
        <div className="text-center p-2">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <div className="decision-fields true">T</div>
      <Handle id="false" type="source" position={Position.Left} className="handle" />
      <Handle id="true" type="source" position={Position.Right} className="handle " />
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
      showToast(T.blocks.decision.toastMsg);
    } catch {
      showToast({ title: T.blocks.errorTxt });
    }
  }

  return (
    <Card className={'small user-select-none clickable ' + className} onClick={handleClick}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon icon={faCodeBranch} />
          {T.blocks.decision.title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-muted">{T.blocks.decision.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function create(pos) {
  return {
    id: uuid(),
    type: 'decision',
    position: pos,
    data: { text: undefined },
  };
}
