import { BlockTypes, DecisionBlockHandle, Point2D, Memory } from '../../types';
import { parse, eval as evaluate } from 'expression-eval';
import Block from '../Block';

class DecisionBlock extends Block {
  constructor(position: Point2D) {
    super(BlockTypes.DECISION_BLOCK, position);
  }

  public override async eval(memory: Memory) {
    const code = this.text.trim();
    if (code.length === 0) {
      throw new Error('Decision code is empty!');
    }
    const ast = parse(code.trim());
    const result = evaluate(ast, memory);
    if (typeof result !== 'boolean') {
      throw new Error('Decision code is invalid!');
    }
    return result === true ? DecisionBlockHandle.TRUE : DecisionBlockHandle.FALSE;
  }

  public override toCode(indent: number): string {
    return `${'  '.repeat(indent)}if (${this._text})\n`;
  }
}

export default DecisionBlock;
