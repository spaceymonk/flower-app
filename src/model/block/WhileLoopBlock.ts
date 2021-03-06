import { BlockTypes, Point2D, Memory, ContainerBlockHandle } from '../../types';
import { parse, eval as evaluate } from 'expression-eval';
import Block from '../Block';

class WhileLoopBlock extends Block {
  constructor(position: Point2D) {
    super(BlockTypes.WHILE_LOOP_BLOCK, position, 200, 200);
  }

  public override toCode(): string {
    return `while (${this._text})`;
  }

  public override isContainer(): boolean {
    return true;
  }

  public override async eval(memory: Memory) {
    const code = this.text.trim();
    if (code.length === 0) {
      throw new Error('While condition is empty!');
    }
    const ast = parse(code.trim());
    const result = evaluate(ast, memory);
    if (typeof result !== 'boolean') {
      throw new Error('Decision code is invalid!');
    }
    return result === true ? ContainerBlockHandle.INNER_SOURCE : ContainerBlockHandle.OUTER_SOURCE;
  }
}

export default WhileLoopBlock;
