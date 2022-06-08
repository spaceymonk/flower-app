import { BlockTypes, Point2D, Memory, EvalOptions } from '../../types';
import { parse, eval as evaluate } from 'expression-eval';
import Block from '../Block';

class StoreBlock extends Block {
  constructor(position: Point2D) {
    super(BlockTypes.STORE_BLOCK, position);
  }

  public override async eval(memory: Memory, { outputHandler }: EvalOptions) {
    const code = this.text.trim();
    const variable = code.trim();
    if (variable.length === 0) {
      throw new Error('Variable name is empty! ');
    }
    const ast = parse(variable);
    const value = evaluate(ast, memory);
    outputHandler.add(value, variable);
    return null;
  }
}

export default StoreBlock;
