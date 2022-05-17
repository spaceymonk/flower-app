import { toast } from 'react-toastify';
import { InvalidDecisionError, MultipleStartError, MultipleStopError, NotConnectedError } from '../../exceptions';
import { GlowTypes, SimulationActions, SimulationContextType } from '../../types';
import { IBlockService } from '../IBlockService';
import { ISimulationService } from '../ISimulationService';

export class SimulationService implements ISimulationService {
  private _context: SimulationContextType;
  private _blockService: IBlockService;

  private _action: SimulationActions = SimulationActions.none;
  private _jumpNextBlock = false;

  constructor(simulationContext: SimulationContextType, blockService: IBlockService) {
    this._context = simulationContext;
    this._blockService = blockService;
  }

  public start(): void {
    if (this._context.isRunning()) {
      toast.error('Simulation already running!');
      return;
    }
    this._action = SimulationActions.debug;
    this._jumpNextBlock = false;
    try {
      flowParser.initialize();
      this.run();
    } catch (e: any) {
      if (e instanceof NotConnectedError || e instanceof InvalidDecisionError) {
        this._blockService.highlight([e.blockId], GlowTypes.ERROR);
      } else if (e instanceof MultipleStartError || e instanceof MultipleStopError) {
        this._blockService.highlight(e.blockIdList, GlowTypes.ERROR);
      }
      this.abort(e.message);
    }
  }

  public stop(): void {
    if (this._context.isRunning()) {
      this._action = SimulationActions.stop;
    }
  }

  public next(): void {
    if (this._context.isRunning()) {
      this._jumpNextBlock = true;
    }
  }

  public resume(): void {
    if (this._context.isRunning()) {
      if (this._action === SimulationActions.continue) {
        this._action = SimulationActions.debug;
        this._jumpNextBlock = false;
      } else if (this._action === SimulationActions.debug) {
        this._action = SimulationActions.continue;
        this._jumpNextBlock = false;
      }
    }
  }

  public run(): void {
    this._context.setRunning(true);
    toast.info('Simulation started!');
    const simulationLoop = () => {
      if (this._action === SimulationActions.stop || !flowParser.hasNext()) {
        this._blockService.highlight(null, GlowTypes.NONE);
        this._context.setRunning(false);
        this._action = SimulationActions.none;
        toast.info('Simulation ended!');
      } else {
        try {
          if (this._action === SimulationActions.continue) {
            flowParser.process();
          } else if (this._action === SimulationActions.debug && this._jumpNextBlock) {
            this._jumpNextBlock = false;
            flowParser.process();
          }
          setTimeout(simulationLoop, this._context.getSpeedInMs());
        } catch (e: any) {
          console.error(e);
          this.abort(e.message);
        }
      }
    };
    simulationLoop();
  }

  private abort(msg: string | null = null) {
    if (msg) toast.error(msg);
    this._context.setRunning(false);
    this._action = SimulationActions.none;
  }
}
