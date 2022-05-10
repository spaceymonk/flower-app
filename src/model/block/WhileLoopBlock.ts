import { Point2D, BlockTypes } from '../../types';
import { ContainerBlock } from '../ContainerBlock';

class WhileLoopBlock extends ContainerBlock {
  constructor(position: Point2D) {
    super(BlockTypes.WHILE_LOOP_BLOCK, position);
  }
}

export default WhileLoopBlock;
