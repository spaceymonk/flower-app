import { Point2D, BlockTypes } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class StopBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STOP_BLOCK, position);
  }

  public override async eval() {
    return null;
  }

  public override isSentinel(): boolean {
    return true;
  }

  public override toCode(): string {
    return 'end';
  }
}

export default StopBlock;
