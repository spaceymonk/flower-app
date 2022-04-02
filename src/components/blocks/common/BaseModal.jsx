import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import T from '../../../services/MessageConstants';
import useBlockService from '../../../hooks/service/useBlockService';

export function BaseModal({ show, children, onSave, onClose, node }) {
  const { removeNode, updateNode } = useBlockService();
  const [name, setName] = React.useState(node.data.name || node.id);
  function handleDelete() {
    removeNode(node);
    onClose();
  }
  function handleNameField() {
    if (name.trim().length === 0) {
      updateNode(node.id, { name: undefined });
      setName(node.id);
    } else {
      updateNode(node.id, { name: name });
    }
  }

  return (
    <Modal show={show} size="md" centered className="node-modal">
      {node && (
        <Modal.Header className="overflow-auto">
          <strong className="me-5 me-sm-auto">{node.type.toUpperCase()}</strong>
          <Form.Control
            className="w-75 text-muted small p-0 text-end fst-italic"
            size="sm"
            plaintext
            placeholder="Block name"
            type="text"
            autoFocus
            onBlur={handleNameField}
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.target.blur();
            }}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
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
