import { BlockTypes, Point2D, Memory, EvalOptions } from '../../types';
import { parse, eval as evaluate } from 'expression-eval';
import Block from '../Block';

const variableRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

class LoadBlock extends Block {
  constructor(position: Point2D) {
    super(BlockTypes.LOAD_BLOCK, position);
  }

  public override async eval(memory: Memory, { inputHandler }: EvalOptions) {
    const code = this.text.trim();
    const tokens = code.split(',');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!token.match(variableRegex)) {
        throw new Error('Variable name is invalid! ' + token);
      }
      const param = await inputHandler.next(token);
      const ast = parse(param);
      const value = evaluate(ast, memory);
      if (typeof value === 'undefined') {
        throw new Error('Invalid input!');
      }
      memory[token] = value;
    }

    return null;
  }
}

export default LoadBlock;
