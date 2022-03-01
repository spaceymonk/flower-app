import React from 'react';
import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { useReactFlow, Handle, Position } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import T from '../../services/MessageConstants';

export function NodeComponent() {
  return (
    <div className="d-flex node node-sentinel">
      <Handle id="false" type="target" position={Position.Top} className="handle" />
      <div className="content">STOP</div>
    </div>
  );
}

export function CreateButton({ className, showToast }) {
  const { setNodes, getNodes, getViewport } = useReactFlow();

  function handleClick() {
    try {
      const viewport = getViewport();
      const pos = { x: -viewport.x / viewport.zoom, y: -viewport.y / viewport.zoom };
      const node = create(pos);
      setNodes(getNodes().concat(node));
      showToast(T.blocks.stop.toastMsg);
    } catch {
      showToast({ title: T.blocks.errorTxt });
    }
  }

  return (
    <Card className={'small user-select-none clickable ' + className} onClick={handleClick}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon icon={faCircleStop} />
          {T.blocks.stop.title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-muted">{T.blocks.stop.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function create(pos) {
  return {
    id: uuid(),
    type: 'stop',
    position: pos,
    data: { text: undefined },
  };
}
