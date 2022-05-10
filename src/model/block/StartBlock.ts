import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class StartBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.START_BLOCK, position);
  }
  isSentinel(): boolean {
    return true;
  }
}

export default StartBlock;
