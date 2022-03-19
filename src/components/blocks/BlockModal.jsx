import { Button, Modal } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlockService } from '../../services/BlockService';
import React from 'react';
import { faCancel, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Form, FloatingLabel } from 'react-bootstrap';

export function BaseModal({ show, children, onSave, onClose, node }) {
  function handleDelete() {
    BlockService.instance().removeNodes(node);
    onClose();
  }

  return (
    <Modal show={show} size="md" centered className="node-modal">
      {node && (
        <Modal.Header className="overflow-auto">
          <strong className="me-5 me-sm-auto">{node.type.toUpperCase()}</strong>
          <em className="text-muted text-nowrap small">{node.id}</em>
        </Modal.Header>
      )}
      {children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer>
        <Button variant="danger" size="sm" onClick={handleDelete} className="me-auto">
          <FontAwesomeIcon icon={faTrashCan} className="me-2" />
          {T.app.deleteTxt}
        </Button>
        {onSave && (
          <Button variant="success" size="sm" onClick={onSave}>
            <FontAwesomeIcon icon={faSave} className="me-2" /> {T.app.saveTxt}
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={onClose}>
          <FontAwesomeIcon icon={faCancel} className="me-2" /> {T.app.cancelTxt}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function BlockModal({ node, onClose, show }) {
  const textAreaRef = React.useRef(null);

  function handleSave() {
    node.data.text = textAreaRef.current.value;
    BlockService.instance().updateNodes(node);
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
