import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../../providers/ServiceProvider';
import Block from '../../../model/Block';

export function BaseModal({ show, children, onSave, onClose, block }: BaseModalProps) {
  const { blockService } = useServiceContext();
  const [name, setName] = React.useState(block.name || block.id);
  function handleDelete() {
    blockService.delete(block.id);
    onClose();
  }
  function handleNameField() {
    if (name.trim().length === 0 || name.trim() === block.id) {
      blockService.update(block.id, { name: undefined });
      setName(block.id);
    } else {
      blockService.update(block.id, { name: name });
    }
  }

  React.useEffect(() => {
    if (show) {
      setName(block.name || block.id);
    }
  }, [block, show]);

  return (
    <Modal show={show} centered className="node-modal">
      {block && (
        <Modal.Header className="overflow-auto">
          <strong className="me-5 me-sm-auto">{block.type.toUpperCase()}</strong>
          <Form.Control
            className="w-75 text-muted small p-0 text-end fst-italic"
            size="sm"
            plaintext
            placeholder="Block name"
            type="text"
            autoFocus
            onBlur={handleNameField}
            onKeyDown={(event: React.KeyboardEvent) => {
              if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
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

BaseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onSave: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
};

interface BaseModalProps extends PropTypes.InferProps<typeof BaseModal.propTypes> {
  block: Block;
}
