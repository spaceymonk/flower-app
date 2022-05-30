import { BlockTypes, Point2D, Memory, EvalOptions } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';

class LoadBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.LOAD_BLOCK, position);
  }

  public override async eval(memory: Memory, { inputHandler }: EvalOptions) {
    const code = this.text.trim();
    const tokens = code.split(',');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (token.length === 0) {
        throw new Error('Variable name is empty: ' + token);
      }
      const param = await inputHandler.next(token);
      const ast = parse(param);
      const value = evaluate(ast, memory);
      memory[token] = value;
    }

    return null;
  }
}

export default LoadBlock;
