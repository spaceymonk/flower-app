import { parse, eval as evaluate } from 'expression-eval';
import { extractValue } from '../../services/helpers/SimulationHelper';
import { BlockTypes, Memory, Point2D, ProjectData } from '../../types';
import { InputHandler } from '../../util/InputHandler';
import { OutputHandler } from '../../util/OutputHandler';
import Block from '../Block';
import { parseArgs } from '../helpers/FunctionBlockHelper';

const functionRegex = /^\((.*)\)\s*=>\s*(([a-zA-Z_][a-zA-Z0-9_]*))$/;

class FunctionBlock extends Block {
  private _subroutine: ProjectData | null;

  constructor(position: Point2D) {
    super(BlockTypes.FUNCTION_BLOCK, position, 200, 200);
    this._subroutine = null;
  }

  public override toCode(indent: number): string {
    const functionMatch = this._text.trim().match(functionRegex);
    if (!functionMatch) {
      throw new Error(`Invalid subroutine call: ${this._text}`);
    }
    const [, args, retVal] = functionMatch;
    return `${'  '.repeat(indent)}${retVal} = ${this._subroutine?.title}(${args})`;
  }

  public override async eval(memory: Memory) {
    if (this._subroutine === null) {
      throw new Error('No subroutine defined');
    }

    const { args, retVal } = this.getIOConfig(memory);
    const virtualInputHandler = new InputHandler(args, () => {
      throw new Error('Insufficient arguments');
    });
    const virtualOutputHandler = new OutputHandler((value: any, variable: string) => {
      memory[retVal] = value;
      return null;
    });
    const virtualMemory = { Math } as Memory;

    // run the simulation
    let currentBlock = this._subroutine.blocks.find((b) => b.type === BlockTypes.START_BLOCK);
    if (!currentBlock) {
      throw new Error('Invalid subroutine');
    }
    while (currentBlock.type !== BlockTypes.STOP_BLOCK) {
      const handleId = await currentBlock.eval(virtualMemory, { inputHandler: virtualInputHandler, outputHandler: virtualOutputHandler });
      currentBlock = this.next(currentBlock, handleId, this._subroutine);
    }

    return null;
  }

  private next(currentBlock: Block, handleId: string | null, pd: ProjectData) {
    const c = pd.connections.find((c) => c.sourceHandle === handleId && c.sourceId === currentBlock.id);
    if (!c) {
      throw new Error('Invalid subroutine');
    }
    const b = pd.blocks.find((b) => b.id === c.targetId);
    if (!b) {
      throw new Error('Invalid subroutine');
    }
    return b;
  }

  private getIOConfig(memory: Memory) {
    const functionMatch = this._text.trim().match(functionRegex);
    if (!functionMatch) {
      throw new Error(`Invalid subroutine call: ${this._text}`);
    }

    let args = '';
    if (functionMatch[1].trim().length !== 0) {
      args = parseArgs(functionMatch[1])
        .map((arg) => {
          const ast = parse(arg.trim());
          const value = evaluate(ast, memory);
          return extractValue(value);
        })
        .join('\n');
    }
    const retVal = functionMatch[2].trim();
    return { args, retVal };
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
