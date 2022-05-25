import { MutableRefObject } from 'react';
import { Memory } from '../../services/helpers/SimulationHelper';
import { BlockTypes, DecisionBlockHandle, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';

class DecisionBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.DECISION_BLOCK, position);
  }

  public override async eval(memoryRef: MutableRefObject<Memory>) {
    const code = this.text.trim();
    const ast = parse(code.trim());
    const result = !!evaluate(ast, memoryRef.current);
    return result === true ? DecisionBlockHandle.TRUE : DecisionBlockHandle.FALSE;
  }
}

export default DecisionBlock;
