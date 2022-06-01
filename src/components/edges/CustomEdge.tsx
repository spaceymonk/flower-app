import React from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import CustomOverlay from '../common/CustomOverlay';
import { getEdgeCenter, getSmoothStepPath, MarkerType, Position } from 'react-flow-renderer';
import PropTypes from 'prop-types';
import { useServiceContext } from '../../providers/ServiceProvider';
import { DecisionBlockHandle } from '../../types';

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
}: CustomEdgeProps) {
  const foreignObjectSize = 80;
  const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({ sourceX, sourceY, targetX, targetY });
  const { connectionRepository } = useServiceContext();
  const [showBtn, toggleBtn] = React.useState(false);

  const handleClick = (evt: React.MouseEvent, id: string) => {
    evt.stopPropagation();
    const edge = connectionRepository.findById(id).orElseThrow(new Error('Edge not found'));
    connectionRepository.delete(edge);
  };

  let x = edgeCenterX - foreignObjectSize / 2;
  let y = edgeCenterY - foreignObjectSize / 2;

  if (sourceHandleId === DecisionBlockHandle.TRUE || sourceHandleId === DecisionBlockHandle.FALSE) {
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

CustomEdge.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  sourcePosition: PropTypes.string.isRequired,
  targetPosition: PropTypes.string.isRequired,
  sourceHandleId: PropTypes.string,
  markerEnd: PropTypes.string.isRequired,
};

interface CustomEdgeProps extends PropTypes.InferProps<typeof CustomEdge.propTypes> {
  sourcePosition: Position;
  targetPosition: Position;
  markerEnd: MarkerType;
}
