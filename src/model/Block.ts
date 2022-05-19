// @ts-ignore
import { v4 as uuid } from 'uuid';
import { Memory } from '../services/helpers/SimulationHelper';
import { BlockTypes, GlowTypes, Point2D } from '../types';

abstract class Block {
  protected _id: string;
  protected _type: BlockTypes;
  protected _position: Point2D;
  protected _text: string;
  protected _glow: GlowTypes;
  protected _name: string | undefined;
  protected _parentNodeId: string | null;
  protected _width: number;
  protected _height: number;

  constructor(type: BlockTypes, position: Point2D, width: number = 200, height: number = 60) {
    this._id = uuid();
    this._glow = GlowTypes.NONE;
    this._width = width;
    this._height = height;
    this._type = type;
    this._position = position;
    this._text = '';
    this._name = undefined;
    this._parentNodeId = null;
  }

  public abstract eval(
    memoryRef: React.MutableRefObject<Memory>,
    options: { inputParams: string; inputParamIter: React.MutableRefObject<number> }
  ): string | null;
  public abstract isContainer(): boolean;
  public isSentinel(): boolean {
    return false;
  }

  /* ------------------------------ Getter/Setter ----------------------------- */
  get id(): string {
    return this._id;
  }
  get type(): BlockTypes {
    return this._type;
  }
  set type(type: BlockTypes) {
    this._type = type;
  }
  get position(): Point2D {
    return this._position;
  }
  set position(position: Point2D) {
    this._position = position;
  }
  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }
  get glow(): GlowTypes {
    return this._glow;
  }
  set glow(glow: GlowTypes) {
    this._glow = glow;
  }
  get name(): string | undefined {
    return this._name;
  }
  set name(name: string | undefined) {
    this._name = name;
  }
  get parentNodeId(): string | null {
    return this._parentNodeId;
  }
  set parentNodeId(parentNodeId: string | null) {
    this._parentNodeId = parentNodeId;
  }
  get width(): number {
    return this._width;
  }
  set width(width: number) {
    this._width = width;
  }
  get height(): number {
    return this._height;
  }
  set height(height: number) {
    this._height = height;
  }
}

export default Block;
