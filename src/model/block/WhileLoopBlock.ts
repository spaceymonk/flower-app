import { BlockTypes, Point2D, Memory, ContainerBlockHandle } from '../../types';
import { ContainerBlock } from '../ContainerBlock';
import { parse, eval as evaluate } from 'expression-eval';

class WhileLoopBlock extends ContainerBlock {
  constructor(position: Point2D) {
    super(BlockTypes.WHILE_LOOP_BLOCK, position, 200, 200);
  }

  public override toCode(indent: number): string {
    return `${'  '.repeat(indent)}while (${this._text})\n`;
  }

  public override async eval(memory: Memory) {
    const code = this.text.trim();
    if (code.length === 0) {
      throw new Error('While condition is empty!');
    }
    const ast = parse(code.trim());
    const result = !!evaluate(ast, memory);
    return result === true ? ContainerBlockHandle.INNER_SOURCE : ContainerBlockHandle.OUTER_SOURCE;
  }
}

export default WhileLoopBlock;
