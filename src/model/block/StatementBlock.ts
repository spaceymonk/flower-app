import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class StatementBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STATEMENT_BLOCK, position);
  }
}

export default StatementBlock;
