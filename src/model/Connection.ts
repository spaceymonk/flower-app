// @ts-ignore
import { v4 as uuid } from 'uuid';

class Connection {
  public id: string;
  public sourceId: string;
  public targetId: string;
  public sourceHandle: string | null;
  public targetHandle: string | null;
  public highlighted: boolean;

  constructor(sourceId: string, targetId: string, sourceHandle: string | null, targetHandle: string | null) {
    this.id = uuid();
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.sourceHandle = sourceHandle;
    this.targetHandle = targetHandle;
    this.highlighted = false;
  }
}

export default Connection;
