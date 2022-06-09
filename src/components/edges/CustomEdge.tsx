import { getSmoothStepPath, MarkerType, Position } from 'react-flow-renderer';
import PropTypes from 'prop-types';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd }: CustomEdgeProps) {
  const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} markerStart="url(" />
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
