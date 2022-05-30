import { MutableRefObject } from 'react';
import { parse, eval as evaluate } from 'expression-eval';
import { extractValue } from '../../services/helpers/SimulationHelper';
import { BlockTypes, Memory, Point2D, ProjectData } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

const functionRegex = /^\((.*)\)\s*=>\s*(([a-zA-Z_][a-zA-Z0-9_]*))$/;

class FunctionBlock extends SimpleBlock {
  private _subroutine: ProjectData | null;

  constructor(position: Point2D) {
    super(BlockTypes.FUNCTION_BLOCK, position, 200, 200);
    this._subroutine = null;
  }

  public override async eval(memoryRef: MutableRefObject<Memory>) {
    if (this._subroutine === null) {
      throw new Error('No subroutine defined');
    }

    const functionMatch = this._text.trim().match(functionRegex);
    if (!functionMatch) {
      throw new Error(`Invalid subroutine call: ${this._text}`);
    }

    let args = '';
    if (functionMatch[1].trim().length !== 0) {
      args = functionMatch[1]
        .split(',') // todo: better split
        .map((arg) => {
          const ast = parse(arg.trim());
          const value = evaluate(ast, memoryRef.current);
          return extractValue(value);
        })
        .join('\n');
    }
    const retVal = functionMatch[2].trim();

    console.log('args:\n', args);
    console.log('retVal:', retVal);

    return null;
  }

  /* --------------------------------- toJSON --------------------------------- */
  public override toJSON(): any {
    const json = super.toJSON();
    return {
      ...json,
      subroutine: this._subroutine,
    };
  }

  /* --------------------------------- Getter --------------------------------- */

  get subroutine(): ProjectData | null {
    return this._subroutine;
  }
  set subroutine(subroutine: ProjectData | null) {
    this._subroutine = subroutine;
  }
}

export default FunctionBlock;
