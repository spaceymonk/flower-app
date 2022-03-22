import { MarkerType } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';

const createEdge = (connection) => {
  return {
    id: uuid(),
    source: connection.source,
    target: connection.target,
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle,
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#505050'
    },
    style: {
      stroke: '#505050'
    }
  };
};

export default createEdge;
