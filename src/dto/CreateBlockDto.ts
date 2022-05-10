import { BlockTypes, Point2D } from '../types';

export interface CreateBlockDto {
  type: BlockTypes;
  position: Point2D;
}
