import { Card } from 'react-bootstrap';
import T from '../../../services/MessageConstants';
import { useReactFlow } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import useBlockHelper from '../../../hooks/useBlockHelper';
import { createBlock } from '../../../services/BlockHelper';
import PropTypes from 'prop-types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BlockTypes } from '../../../types';

function BlockCreateButton({ title, description, icon, type }: BlockCreateButtonProps) {
  const { getViewport } = useReactFlow();
  const { addBlock } = useBlockHelper();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const block = createBlock(type, pos);
      addBlock(block);
      toast.success(T.blocks.creationSuccess);
    } catch {
      toast.error(T.blocks.creationFailed);
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
