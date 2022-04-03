import { Connection, Edge, MarkerType } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import { throwErrorIfNull } from './common';

export const includesEdge = (edgeList: Edge[], edge: Edge): boolean => {
  for (let i = 0; i < edgeList.length; i++) {
    if (edgeList[i].id === edge.id) {
      return true;
    }
  }
  return false;
};

export const createEdge = (connection: Connection): Edge => {
  return {
    id: uuid(),
    source: throwErrorIfNull(connection.source),
    target: throwErrorIfNull(connection.target),
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle,
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#505050' },
  };
};
