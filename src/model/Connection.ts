// @ts-ignore
import { v4 as uuid } from 'uuid';
import { GlowTypes } from '../types';

class Connection {
  public id: string;
  public sourceId: string;
  public targetId: string;
  public sourceHandle: string | null;
  public targetHandle: string | null;
  public glow: GlowTypes;

  constructor(sourceId: string, targetId: string, sourceHandle: string | null, targetHandle: string | null) {
    this.id = uuid();
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.sourceHandle = sourceHandle;
    this.targetHandle = targetHandle;
    this.glow = GlowTypes.NONE;
  }
}

export default Connection;
