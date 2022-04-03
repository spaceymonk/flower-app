import { Card } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import { useReactFlow } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import createNode from '../../../services/createNode';
import useBlockService from '../../../hooks/service/useBlockService';

function BlockCreateButton({ title, description, icon, type }) {
  const { getViewport } = useReactFlow();
  const { addNode } = useBlockService();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const node = createNode(type, pos);
      addNode(node);
      toast.success(T.blocks.creationSuccess);
    } catch {
      toast.error(T.blocks.creationFailed);
    }
  }

  return (
    <Card className='small user-select-none clickable mb-3' onClick={handleClick}>
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

export default BlockCreateButton;
