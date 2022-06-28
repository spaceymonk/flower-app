import Block from '../model/Block';
import { BlockTypes, GlowTypes, Point2D } from '../types';
import { IRepository } from './IRepository';

export interface IBlockRepository extends IRepository<Block> {
  findAllByParentNodeId(id: string): Block[];
  countByTypes(): { [type in BlockTypes]?: number };
  findAllExcept(blocks: Block[]): Block[];
  updateHighlightedByIdList(ids: string[], glowType: GlowTypes): void;
  updatePosition(id: string, position: Point2D): Block;
  updateDimensions(id: string, dimensions: { width: number; height: number }): Block;
}
