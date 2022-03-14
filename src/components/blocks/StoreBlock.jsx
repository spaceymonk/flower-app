import React from 'react';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { BlockService } from '../../services/BlockService';
import { BaseNodeModal, BaseCreateButton, BaseNodeComponent } from './Block';

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
        <Form.Label>{T.blocks.store.label}</Form.Label>
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

export function NodeComponent(node) {
  const processed = node.data.text; //todo: handle special keywords by bolding them etc.

  return (
    <BaseNodeComponent node={node}>
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="w-100">
        <div className="header">STORE</div>
        <div className="p-2 text-center">
          {!processed && <em className="text-muted">{T.blocks.defaultTxt}</em>}
          {processed}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </BaseNodeComponent>
  );
}

export function CreateButton({ className }) {
  function create(pos) {
    return {
      id: uuid(),
      type: 'store',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <BaseCreateButton
      className={className}
      onCreate={create}
      title={T.blocks.store.title}
      description={T.blocks.store.description}
      icon={faPrint}
    />
  );
}
