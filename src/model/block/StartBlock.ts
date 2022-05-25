import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class StartBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.START_BLOCK, position);
  }

  public override async eval() {
    return null;
  }
  public override isSentinel(): boolean {
    return true;
  }
}

export default StartBlock;
