import Block from '../model/Block';
import { CreateBlockDto } from '../dto/CreateBlockDto';
import { UpdateBlockDto } from '../dto/UpdateBlockDto';
import { GlowTypes } from '../types';

export interface IBlockService {
  create(dto: CreateBlockDto): Block;
  update(id: string, dto: UpdateBlockDto): Block;
  delete(id: string): void;
  highlight(ids: string[] | null, glowType: GlowTypes): void;
  focus(b: Block): void;
  getAllAvailableChildren(id: string, excludeList: Block[]): Block[];
  getOutgoers(block: Block): Block[];
}
