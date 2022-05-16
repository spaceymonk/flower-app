import { Edge, EdgeMarkerType, MarkerType } from 'react-flow-renderer';
import Connection from '../model/Connection';

class ConnectionAdapter implements Edge {
  private _logic: Connection;
  constructor(logic: Connection) {
    this._logic = logic;
  }

  get id(): string {
    return this._logic.id;
  }
  get type(): string {
    return 'custom';
  }
  get source(): string {
    return this._logic.sourceId;
  }
  get target(): string {
    return this._logic.targetId;
  }
  get markerEnd(): EdgeMarkerType {
    return { type: MarkerType.ArrowClosed, color: '#505050' };
  }
  get sourceHandle(): string | undefined {
    return this._logic.sourceHandle || undefined;
  }
  get targetHandle(): string | undefined {
    return this._logic.targetHandle || undefined;
  }
}

export default ConnectionAdapter;
