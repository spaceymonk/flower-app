import Block from '../model/Block';
import { IRepository } from './IRepository';

export interface IBlockRepository extends IRepository<Block> {
  getDirectChildren(id: string): Block[];
}
