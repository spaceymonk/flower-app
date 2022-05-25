import Block from '../model/Block';
import { BlockTypes } from '../types';
import { IRepository } from './IRepository';

export interface IBlockRepository extends IRepository<Block> {
  getDirectChildren(id: string): Block[];
  countByTypes(): { [type in BlockTypes]: number };
}
