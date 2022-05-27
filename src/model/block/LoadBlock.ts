import { MutableRefObject } from 'react';
import { BlockTypes, Point2D, Memory, EvalOptions } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';

class LoadBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.LOAD_BLOCK, position);
  }

  public override async eval(memoryRef: MutableRefObject<Memory>, { inputHandler }: EvalOptions) {
    const code = this.text.trim();
    const tokens = code.split(',');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      const param = await inputHandler.next(token);
      const ast = parse(param);
      const value = evaluate(ast, memoryRef.current);
      memoryRef.current[token] = value;
    }

    return null;
  }
}

export default LoadBlock;
