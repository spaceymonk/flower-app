import React from 'react';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';
import { BlockService } from '../../services/BlockService';
import { BaseCreateButton, BaseNodeModal } from './Block';
import { Form } from 'react-bootstrap';
import { Handle, Position } from 'react-flow-renderer';

export function NodeModal({ show, onClose, node }) {
  const textAreaRef = React.useRef(null);

  function handleSave() {
    node.data.text = textAreaRef.current.value;
    BlockService.instance().updateNodes(node);
    onClose();
  }

  return (
    <BaseNodeModal show={show} onSave={handleSave} onClose={onClose}>
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
    </BaseNodeModal>
  );
}

export function NodeComponent({ data }) {
  const processed = data.text; //todo: handle special keywords by bolding them etc.

  return (
    <div className="d-flex node node-decision">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="decision-fields false">F</div>
      <div className="w-100">
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
  function create(pos) {
    return {
      id: uuid(),
      type: 'decision',
      position: pos,
      data: { text: undefined },
    };
  }

  return (
    <BaseCreateButton
      className={className}
      showToast={showToast}
      onCreate={create}
      title={T.blocks.decision.title}
      description={T.blocks.decision.description}
      icon={faCodeBranch}
    />
  );
}
