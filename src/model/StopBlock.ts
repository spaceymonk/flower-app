import { Point2D, BlockTypes } from '../types';
import Block from './Block';

class StopBlock extends Block {
  isContainer(): boolean {
    return false;
  }
  constructor(position: Point2D, text: string | undefined, name: string | undefined, parentNodeId: string | null) {
    super(BlockTypes.STOP_BLOCK, position, text, name, parentNodeId);
  }
}

export default StopBlock;
