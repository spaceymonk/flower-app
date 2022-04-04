import { Edge, XYPosition } from 'react-flow-renderer';
import { Block } from '../types';

export type SetBlocks = React.Dispatch<React.SetStateAction<Block[]>>;

export type SetEdges = React.Dispatch<React.SetStateAction<Edge[]>>;

export class PositionGenerator {
  private position: XYPosition;

  constructor(private readonly startPosition: XYPosition, private readonly step: number) {
    this.position = startPosition;
  }

  public nextPosition = () => {
    this.position = {
      x: this.position.x + this.step,
      y: this.position.y + this.step,
    };
    return this.position;
  };
}
