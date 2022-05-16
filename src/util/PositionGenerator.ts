import { Point2D } from '../types';

export class PositionGenerator {
  private _position: Point2D;
  private _step: number;

  constructor(startPosition: Point2D, step: number) {
    this._position = startPosition;
    this._step = step;
  }

  public nextPosition = () => {
    this._position = {
      x: this._position.x + this._step,
      y: this._position.y + this._step,
    };
    return this._position;
  };
}
