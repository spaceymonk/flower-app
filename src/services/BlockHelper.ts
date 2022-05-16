import { CreateBlockDto } from '../dto/CreateBlockDto';
import Block from '../model/Block';
import DecisionBlock from '../model/block/DecisionBlock';
import LoadBlock from '../model/block/LoadBlock';
import StartBlock from '../model/block/StartBlock';
import StatementBlock from '../model/block/StatementBlock';
import StopBlock from '../model/block/StopBlock';
import StoreBlock from '../model/block/StoreBlock';
import WhileLoopBlock from '../model/block/WhileLoopBlock';
import { BlockTypes } from '../types';

export class BlockCreateFactory {
  static create(dto: CreateBlockDto): Block {
    if (dto.type === BlockTypes.STATEMENT_BLOCK) {
      return new StatementBlock(dto.position);
    } else if (dto.type === BlockTypes.DECISION_BLOCK) {
      return new DecisionBlock(dto.position);
    } else if (dto.type === BlockTypes.LOAD_BLOCK) {
      return new LoadBlock(dto.position);
    } else if (dto.type === BlockTypes.STORE_BLOCK) {
      return new StoreBlock(dto.position);
    } else if (dto.type === BlockTypes.START_BLOCK) {
      return new StartBlock(dto.position);
    } else if (dto.type === BlockTypes.STOP_BLOCK) {
      return new StopBlock(dto.position);
    } else if (dto.type === BlockTypes.WHILE_LOOP_BLOCK) {
      return new WhileLoopBlock(dto.position);
    } else {
      throw new Error('Unknown block type');
    }
  }
}

export const includesBlock = (blockList: Block[], block: Block): boolean => {
  for (let i = 0; i < blockList.length; i++) {
    if (blockList[i].id === block.id) {
      return true;
    }
  }
  return false;
};
