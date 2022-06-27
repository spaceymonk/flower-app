import { BlockTypes, Point2D } from '../../types';
import Block from '../Block';

class StartBlock extends Block {
  constructor(position: Point2D) {
    super(BlockTypes.START_BLOCK, position);
  }

  public override async eval() {
    return null;
  }
  public override isSentinel(): boolean {
    return true;
  }
  public override toCode(): string {
    return 'begin';
  }
}

export default StartBlock;
