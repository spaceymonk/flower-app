import { CreateBlockDto } from '../../dto/CreateBlockDto';
import Block from '../../model/Block';
import DecisionBlock from '../../model/block/DecisionBlock';
import FunctionBlock from '../../model/block/FunctionBlock';
import LoadBlock from '../../model/block/LoadBlock';
import StartBlock from '../../model/block/StartBlock';
import StatementBlock from '../../model/block/StatementBlock';
import StopBlock from '../../model/block/StopBlock';
import StoreBlock from '../../model/block/StoreBlock';
import WhileLoopBlock from '../../model/block/WhileLoopBlock';
import { BlockTypes } from '../../types';

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
    } else if (dto.type === BlockTypes.FUNCTION_BLOCK) {
      return new FunctionBlock(dto.position);
    } else {
      throw new Error('Unknown block type');
    }
  }

  static fromJSON(json: any): Block {
    const block = BlockCreateFactory.create({ type: json.type, position: json.position });
    block.id = json.id;
    block.text = json.text;
    block.glow = json.glow;
    block.name = json.name;
    block.parentNodeId = json.parentNodeId;
    block.width = json.width;
    block.height = json.height;
    if (block instanceof FunctionBlock) {
      const subroutine = {
        ...json.subroutine,
        blocks: json.subroutine.blocks.map((b: any) => BlockCreateFactory.fromJSON(b)),
      };
      block.subroutine = subroutine;
    }
    return block;
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
