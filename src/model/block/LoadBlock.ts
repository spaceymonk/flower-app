import { MutableRefObject } from 'react';
import { Memory } from '../../services/helpers/SimulationHelper';
import { BlockTypes, Point2D } from '../../types';
import { SimpleBlock } from '../SimpleBlock';
import { parse, eval as evaluate } from 'expression-eval';

class LoadBlock extends SimpleBlock {
  constructor(position: Point2D) {
    super(BlockTypes.LOAD_BLOCK, position);
  }

  public override eval(
    memoryRef: MutableRefObject<Memory>,
    { inputParams, inputParamIter }: { inputParams: string; inputParamIter: React.MutableRefObject<number> }
  ): null {
    const code = this.text.trim();
    const tokens = code.split(', '); // @todo: bettter splitting!!!

    if (inputParams === '') {
      throw new Error('No input parameters');
    }
    const params = inputParams.split('\n');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      const param = params.at(inputParamIter.current);
      if (param === undefined) {
        throw new Error(`No input parameter at line ${inputParamIter.current + 1}`);
      }
      const ast = parse(param);
      const value = evaluate(ast, memoryRef.current);
      memoryRef.current[token] = value;
      inputParamIter.current = inputParamIter.current + 1;
    }

    return null;
  }
}

export default LoadBlock;
