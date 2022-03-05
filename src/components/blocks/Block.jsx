import { Card, Button, Modal } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import { useReactFlow } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlockService } from '../../services/BlockService';

export function BaseNodeModal({ show, children, onSave, onClose }) {
  return (
    <Modal show={show} size="md" centered>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="sm" onClick={onSave}>
          {T.app.saveTxt}
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          {T.app.cancelTxt}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function BaseCreateButton({ className, showToast, onCreate, title, description, icon }) {
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
