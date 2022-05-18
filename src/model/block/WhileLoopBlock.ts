import { Point2D, BlockTypes, ContainerBlockHandle } from '../../types';
import { ContainerBlock } from '../ContainerBlock';
import { parse, eval as evaluate } from 'expression-eval';
import { MutableRefObject } from 'react';
import { Memory } from '../../services/helpers/SimulationHelper';

class WhileLoopBlock extends ContainerBlock {
  constructor(position: Point2D) {
    super(BlockTypes.WHILE_LOOP_BLOCK, position, 200, 200);
  }

  public override eval(memoryRef: MutableRefObject<Memory>): string {
    const code = this.text.trim();
    const ast = parse(code.trim());
    const result = !!evaluate(ast, memoryRef.current);
    return result === true ? ContainerBlockHandle.INNER_SOURCE : ContainerBlockHandle.OUTER_SOURCE;
  }
}

export default WhileLoopBlock;
