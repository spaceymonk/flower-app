import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import T from '../../../services/MessageConstants';
import useBlockService from '../../../hooks/service/useBlockService';


export function BaseModal({ show, children, onSave, onClose, node }) {
  const { removeNode } = useBlockService();
  function handleDelete() {
    removeNode(node); //todo change parameter to id
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
