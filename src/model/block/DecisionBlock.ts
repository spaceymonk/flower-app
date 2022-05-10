import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class DecisionBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.DECISION_BLOCK, position);
  }
}

export default DecisionBlock;
