import { Card } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import { useReactFlow } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlockService } from '../../services/BlockService';
import { toast } from 'react-toastify';
import createNodeFactory from '../../services/createNodeFactory';

function BlockCreateButton({ className, title, description, icon, type }) {
  const { getViewport } = useReactFlow();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const node = createNodeFactory(type, pos);
      BlockService.instance().addNodes(node);
      toast.success(T.blocks.creationSuccess);
    } catch {
      toast.error(T.blocks.creationFailed);
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

export default BlockCreateButton;