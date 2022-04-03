import { XYPosition } from 'react-flow-renderer';

// make sure that the string you type is a property on a given object.
export const nameof = <T>(name: keyof T) => name;

export const throwErrorIfNull = (value: any, errorMsg = 'Value cannot be null'): any => {
  if (value === null) {
    throw new Error(errorMsg);
  }
  return value;
};

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
