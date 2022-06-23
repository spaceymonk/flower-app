import { Edge, MarkerType } from 'react-flow-renderer';
import Connection from '../model/Connection';
import { GlowTypes } from '../types';

class ConnectionAdapter {
  public static toEdge(connection: Connection): Edge {
    return {
      id: connection.id,
      source: connection.sourceId,
      target: connection.targetId,
      targetHandle: connection.targetHandle,
      sourceHandle: connection.sourceHandle,
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed, color: connection.glow === GlowTypes.ANIMATE ? '#00f' : '#505050' },
      animated: connection.glow === GlowTypes.ANIMATE,
      className: connection.glow === GlowTypes.NORMAL ? 'highlighted__normal' : connection.glow === GlowTypes.ANIMATE ? 'highlighted__animate' : '',
    };
  }
}

export default ConnectionAdapter;
