import { Point2D, BlockTypes } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class StopBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STOP_BLOCK, position);
  }
  isSentinel(): boolean {
    return true;
  }
}

export default StopBlock;
