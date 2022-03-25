import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import useBlockService from '../../../hooks/service/useBlockService';
import { BaseModal } from './BaseModal';

export function BlockModal({ node, onClose, show }) {
  const { updateNode } = useBlockService();
  const textAreaRef = React.useRef(null);

  function handleSave() {
    updateNode(node.id, { text: textAreaRef.current.value });
    onClose();
  }

  return (
    <BaseModal show={show} onSave={handleSave} onClose={onClose} node={node}>
      <Form.Group className="mb-3">
        <FloatingLabel label={T.blocks.label}>
          <Form.Control
            placeholder={T.blocks.label}
            as="textarea"
            ref={textAreaRef}
            defaultValue={node?.data?.text}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') handleSave();
            }}
          />
        </FloatingLabel>
      </Form.Group>
    </BaseModal>
  );
}
