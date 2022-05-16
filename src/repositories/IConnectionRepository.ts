import Block from '../model/Block';
import Connection from '../model/Connection';
import { IRepository } from './IRepository';

export interface IConnectionRepository extends IRepository<Connection> {
  findByBlocks(blocks: Block[]): Connection[];
  findAllBySourceId(id: string): Connection[];
  findAllByTargetId(id: string): Connection[];
  findAllBySourceIdAndTargetId(sourceId: string, targetId: string): Connection[];
}
