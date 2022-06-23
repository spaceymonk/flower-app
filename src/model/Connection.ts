// @ts-ignore
import { v4 as uuid } from 'uuid';
import { GlowTypes } from '../types';

class Connection {
  private _id: string;
  private _sourceId: string;
  private _targetId: string;
  private _sourceHandle: string | null;
  private _targetHandle: string | null;
  private _glow: GlowTypes;

  constructor(sourceId: string, targetId: string, sourceHandle: string | null, targetHandle: string | null) {
    this._id = uuid();
    this._sourceId = sourceId;
    this._targetId = targetId;
    this._sourceHandle = sourceHandle;
    this._targetHandle = targetHandle;
    this._glow = GlowTypes.NONE;
  }

  public toJSON(): any {
    return {
      id: this._id,
      sourceId: this._sourceId,
      targetId: this._targetId,
      sourceHandle: this._sourceHandle,
      targetHandle: this._targetHandle,
    };
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get sourceId(): string {
    return this._sourceId;
  }
  public set sourceId(value: string) {
    this._sourceId = value;
  }
  public get targetId(): string {
    return this._targetId;
  }
  public set targetId(value: string) {
    this._targetId = value;
  }
  public get sourceHandle(): string | null {
    return this._sourceHandle;
  }
  public set sourceHandle(value: string | null) {
    this._sourceHandle = value;
  }
  public get targetHandle(): string | null {
    return this._targetHandle;
  }
  public set targetHandle(value: string | null) {
    this._targetHandle = value;
  }
  public get glow(): GlowTypes {
    return this._glow;
  }
  public set glow(value: GlowTypes) {
    this._glow = value;
  }
}

export default Connection;
