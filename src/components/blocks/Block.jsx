import { Card } from 'react-bootstrap';
import T from '../../services/MessageConstants';
import { useReactFlow } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlockService } from '../../services/BlockService';
import React from 'react';
import { toast } from 'react-toastify';

export function BaseNodeComponent({ node, ...props }) {
  const style = node && node.data && node.data.glow ? { filter: 'brightness(.5)' } : {};
  return <div {...props} className={`d-flex node ${props.className}`} style={style} />;
}

export function NodeCreateButton({ className, onCreate, title, description, icon }) {
  const { getViewport } = useReactFlow();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const node = onCreate(pos);
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
