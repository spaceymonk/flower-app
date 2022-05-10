import { v4 as uuid } from 'uuid';
import { BlockTypes, GlowTypes, Point2D } from '../types';

abstract class Block {
  public id: string;
  public type: BlockTypes;
  public position: Point2D;
  public text: string | undefined;
  public glow: GlowTypes;
  public name: string | undefined;
  public parentNodeId: string | null;
  public width: number;
  public height: number;

  constructor(type: BlockTypes, position: Point2D) {
    this.id = uuid();
    this.glow = GlowTypes.NONE;
    this.width = 0;
    this.height = 0;
    this.type = type;
    this.position = position;
    this.text = undefined;
    this.name = undefined;
    this.parentNodeId = null;
  }

  abstract isContainer(): boolean;
}

export default Block;
