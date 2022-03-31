import React from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import CustomOverlay from '../common/CustomOverlay';
import { getEdgeCenter, getSmoothStepPath } from 'react-flow-renderer';
import useEdgeService from '../../hooks/service/useEdgeService';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceHandleId,
  markerEnd,
}) {
  const foreignObjectSize = 80;
  const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({ sourceX, sourceY, targetX, targetY });
  const { removeEdge } = useEdgeService();
  const [showBtn, toggleBtn] = React.useState(false);

  const handleClick = (evt, id) => {
    evt.stopPropagation();
    removeEdge(id);
  };

  let x = edgeCenterX - foreignObjectSize / 2;
  let y = edgeCenterY - foreignObjectSize / 2;

  if (sourceHandleId === 'true' || sourceHandleId === 'false') {
    x = targetX - foreignObjectSize / 2;
    y = sourceY - foreignObjectSize / 2;
  }

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} markerStart="url(" />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={x}
        y={y}
        className="customedge-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div
          className="btn-wrapper"
          onMouseEnter={() => toggleBtn(true)}
          onMouseLeave={() => toggleBtn(false)}
          style={{ opacity: showBtn ? '1' : '0' }}
        >
          <CustomOverlay overlay={<Tooltip>Delete Connection</Tooltip>}>
            <Button
              variant="danger"
              size="sm"
              disabled={!showBtn}
              className="rounded rounded-circle customedge-btn d-flex justify-content-center align-items-center"
              onClick={(event) => handleClick(event, id)}
            >
              <FontAwesomeIcon icon={faRemove} size="xs" />
            </Button>
          </CustomOverlay>
        </div>
      </foreignObject>
    </>
  );
}
