import { BlockTypes, Point2D, ProjectData } from '../types';

export interface CreateBlockDto {
  type: BlockTypes;
  position: Point2D;
  subroutine?: ProjectData;
}
