import { Edge, MarkerType } from 'react-flow-renderer';
import Connection from '../model/Connection';

class ConnectionAdapter {
  public static toEdge(connection: Connection): Edge {
    return {
      id: connection.id,
      source: connection.sourceId,
      target: connection.targetId,
      targetHandle: connection.targetHandle,
      sourceHandle: connection.sourceHandle,
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#505050' },
    };
  }
}

export default ConnectionAdapter;
