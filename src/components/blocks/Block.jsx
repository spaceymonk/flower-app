import { Card, Button, Modal } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import { useReactFlow } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlockService } from '../../services/BlockService';
import React from 'react';
import { faCancel, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../pages/App';

export function BaseNodeModal({ show, children, onSave, onClose, node }) {
  function handleDelete() {
    BlockService.instance().removeNodes(node);
    onClose();
  }

  return (
    <Modal show={show} size="md" centered>
      {node && <Modal.Header className='overflow-auto'>
        <strong className='me-5 me-sm-auto'>{node.type.toUpperCase()}</strong>
        <em className="text-muted text-nowrap small">{node.id}</em>
      </Modal.Header>}
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

export function BaseCreateButton({ className, onCreate, title, description, icon }) {
  const { showToast } = React.useContext(AppContext);
  const { getViewport } = useReactFlow();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const node = onCreate(pos);
      BlockService.instance().addNodes(node);
      showToast(T.blocks.toastMsg);
    } catch {
      showToast({ title: T.blocks.errorTxt });
    }
  }

  return (
    <Card className={'small user-select-none clickable ' + className} onClick={handleClick}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon icon={icon} />
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-muted">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
