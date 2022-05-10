import { BlockTypes, Point2D } from '../types';
import Block from './Block';

class StartBlock extends Block {
  isContainer(): boolean {
    return false;
  }
  constructor(position: Point2D, text: string | undefined, name: string | undefined, parentNodeId: string | null) {
    super(BlockTypes.START_BLOCK, position, text, name, parentNodeId);
  }
}

export default StartBlock;
