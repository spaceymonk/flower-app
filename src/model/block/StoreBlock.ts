import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class StoreBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STORE_BLOCK, position);
  }
}

export default StoreBlock;
