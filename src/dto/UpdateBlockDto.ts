import Block from '../model/Block';
import { GlowTypes, Point2D, ProjectData } from '../types';

export interface UpdateBlockDto {
  position?: Point2D;
  width?: number;
  height?: number;
  text?: string;
  name?: string;
  glow?: GlowTypes;
  subroutine?: ProjectData;
  children?: Block[];
}
