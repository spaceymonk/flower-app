import { BlockTypes, Point2D, Memory } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';

const stmtPattern = /^(([a-zA-Z_][a-zA-Z0-9_]*)(\[(.*)\])?\s*=\s*)?(.*)$/;

class StatementBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STATEMENT_BLOCK, position);
  }

  public override async eval(memoryRef: React.MutableRefObject<Memory>) {
    const code = this.text.trim();

    const stmtMatch = code.match(stmtPattern);
    if (!stmtMatch) {
      throw new Error(`Invalid statement: ${code}`);
    }

    const lValue = stmtMatch[2];
    const lValueIndex = stmtMatch[4];
    const rValue = stmtMatch[5];

    if (!rValue) {
      throw new Error(`Invalid statement: ${code}`);
    }

    const ast = parse(rValue);
    const result = evaluate(ast, memoryRef.current);

    if (lValue) {
      if (lValueIndex) {
        const indexAst = parse(lValueIndex);
        const indexResult = evaluate(indexAst, memoryRef.current);
        memoryRef.current[lValue][indexResult] = result;
      } else {
        memoryRef.current[lValue] = result;
      }
    }

    return null;
  }
}

export default StatementBlock;
