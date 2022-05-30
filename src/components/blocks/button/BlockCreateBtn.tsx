import { Card } from 'react-bootstrap';
import T from '../../../config/MessageConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BlockTypes } from '../../../types';
import { useServiceContext } from '../../../providers/ServiceProvider';

function BlockCreateButton({ title, description, icon, type }: BlockCreateButtonProps) {
  const { blockService, canvasFacade } = useServiceContext();

  function handleClick() {
    try {
      const viewport = canvasFacade.getViewport();
      const position = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      blockService.create({ type, position });
      toast.success(T.blocks.creationSuccess);
    } catch (e: any) {
      toast.error(T.blocks.creationFailed + e.message);
    }
  }

  return (
    <Card className="small user-select-none clickable mb-3" onClick={handleClick}>
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

BlockCreateButton.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

export interface BlockCreateButtonProps extends PropTypes.InferProps<typeof BlockCreateButton.propTypes> {
  icon: IconProp;
  type: BlockTypes;
}

export default BlockCreateButton;
