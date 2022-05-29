import { MutableRefObject } from 'react';
import { BlockTypes, Memory, Point2D, ProjectData } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

class FunctionBlock extends SimpleBlock {
  private _subroutine: ProjectData | null;

  constructor(position: Point2D) {
    super(BlockTypes.FUNCTION_BLOCK, position, 200, 200);
    this._subroutine = null;
  }

  public override async eval(memoryRef: MutableRefObject<Memory>) {
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
