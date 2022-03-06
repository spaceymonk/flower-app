import React from 'react';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { BlockService } from '../../services/BlockService';
import { BaseNodeModal, BaseCreateButton } from './Block';

export function NodeModal({ show, onClose, node }) {
  const textAreaRef = React.useRef(null);

  function handleSave() {
    node.data.text = textAreaRef.current.value;
    BlockService.instance().updateNodes(node);
    onClose();
  }

  return (
    <BaseNodeModal show={show} onSave={handleSave} onClose={onClose} node={node}>
      <Form.Group className="mb-3">
        <Form.Label>{T.blocks.statement.label}</Form.Label>
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
    </BaseNodeModal>
  );
}

export function NodeComponent({ data }) {
  const processed = data.text; //todo: handle special keywords by bolding them etc.

  return (
    <div className="d-flex node node-statement">
      <Handle type="target" position={Position.Top} className="handle" />
      <div>
        {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
        {processed}
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </div>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'statement',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <BaseCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.statement.title}
      description={T.blocks.statement.description}
      icon={faCode}
    />
  );
}
