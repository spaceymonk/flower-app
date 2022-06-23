import Connection from '../../model/Connection';

export class ConnectionCreateFactory {
  static fromJSON(json: any): Connection {
    return new Connection(json.sourceId, json.targetId, json.sourceHandle, json.targetHandle);
  }
}
