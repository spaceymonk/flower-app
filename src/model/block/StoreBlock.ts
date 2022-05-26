import { displayValue, Memory } from '../../services/helpers/SimulationHelper';
import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';
import { EvalOptions } from '../Block';

class StoreBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STORE_BLOCK, position);
  }

  public override async eval(memoryRef: React.MutableRefObject<Memory>, { outputHandler }: EvalOptions) {
    const code = this.text.trim();
    const variable = code.trim();
    const ast = parse(variable);
    const value = evaluate(ast, memoryRef.current);
    if (variable.startsWith('"')) {
      outputHandler.add(displayValue(value));
    } else {
      outputHandler.add(`${variable} = ${displayValue(value)}`);
    }
    return null;
  }
}

export default StoreBlock;
