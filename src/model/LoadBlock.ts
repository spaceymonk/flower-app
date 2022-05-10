import { BlockTypes, Point2D } from '../types';
import Block from './Block';

class LoadBlock extends Block {
  isContainer(): boolean {
    return false;
  }
  constructor(position: Point2D, text: string | undefined, name: string | undefined, parentNodeId: string | null) {
    super(BlockTypes.LOAD_BLOCK, position, text, name, parentNodeId);
  }
}

export default LoadBlock;
