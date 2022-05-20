import { toast } from 'react-toastify';
import { displayValue, Memory } from '../../services/helpers/SimulationHelper';
import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';

class StoreBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.STORE_BLOCK, position);
  }

  public override eval(memoryRef: React.MutableRefObject<Memory>): null {
    const code = this.text.trim();
    const tokens = code.split(', '); // @todo: bettter splitting!!!
    tokens.forEach((t) => {
      const variable = t.trim();
      const ast = parse(variable);
      const value = evaluate(ast, memoryRef.current);
      toast.info(`${variable} = ${displayValue(value)}`);
    });
    return null;
  }
}

export default StoreBlock;
