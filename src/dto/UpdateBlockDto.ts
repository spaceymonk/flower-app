import { GlowTypes, Point2D } from '../types';

export interface UpdateBlockDto {
  position?: Point2D;
  width?: number;
  height?: number;
  text?: string;
  name?: string;
  glow?: GlowTypes;
}
