import Block from '../model/Block';
import Connection from '../model/Connection';
import { GlowTypes } from '../types';
import { Optional } from '../util/Optional';
import { IRepository } from './IRepository';

export interface IConnectionRepository extends IRepository<Connection> {
  countByBlocks(blocks: Block[]): number;
  findByBlocks(blocks: Block[]): Connection[];
  findBySourceHandleAndSourceId(handleId: string | null, sourceId: string): Optional<Connection>;
  findAllBySourceId(id: string): Connection[];
  findAllByTargetId(id: string): Connection[];
  findAllBySourceIdAndTargetId(sourceId: string, targetId: string): Connection[];
  existsBySourceIdAndSourceHandle(sourceId: string, sourceHandle: string | null): boolean;
  existsBySourceIdAndSourceHandleAndTargetIdAndTargetHandle(
    sourceId: string,
    sourceHandle: string | null,
    targetId: string,
    targetHandle: string | null
  ): boolean;
  updateHighlightedByIdList(ids: string[], glow: GlowTypes): void;
  findAllBySourceIdOrTargetId(id: string): Connection[];
}
