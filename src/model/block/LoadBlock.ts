import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class LoadBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.LOAD_BLOCK, position);
  }
}

export default LoadBlock;
