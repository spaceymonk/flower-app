import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class FunctionBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.FUNCTION_BLOCK, position, 200, 200);
  }

  public override async eval() {
    return null;
  }
}

export default FunctionBlock;
