import Block from '../model/Block';
import { BlockTypes, GlowTypes } from '../types';
import { IRepository } from './IRepository';

export interface IBlockRepository extends IRepository<Block> {
  findAllByParentNodeId(id: string): Block[];
  countByTypes(): { [type in BlockTypes]?: number };
  findAllExcept(blocks: Block[]): Block[];
  updateHighlightedByIdList(ids: string[], glowType: GlowTypes): void;
}
