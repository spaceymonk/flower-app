import { Point2D, BlockTypes } from '../types';
import Block from './Block';

class WhileLoopBlock extends Block {
  isContainer(): boolean {
    return true;
  }
  constructor(position: Point2D, text: string | undefined, name: string | undefined, parentNodeId: string | null) {
    super(BlockTypes.WHILE_LOOP_BLOCK, position, text, name, parentNodeId);
  }
}

export default WhileLoopBlock;
