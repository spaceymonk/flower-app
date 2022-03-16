import { toast } from 'react-toastify';

import { BlockService } from './BlockService';
import NotConnectedError from './exceptions/NotConnectedError';
import { FlowParser } from './simulation/FlowParserService';

const SimulationActions = Object.freeze({
  none: 0,
  stop: 1,
  continue: 2,
  debug: 3,
});

export class SimulationService {
  constructor() {
    this.speedInMs = 500;
    this.isRunning = false;
    this.jumpNextBlock = false;
    this.action = SimulationActions.none;
  }

  static instance(args) {
    if (!SimulationService._instance) {
      SimulationService._instance = new SimulationService(args);
    }
    return SimulationService._instance;
  }

  start(callback) {
    this.action = SimulationActions.debug;
    this.jumpNextBlock = false;
    try {
      this.run(callback);
    } catch (e) {
      if (e instanceof NotConnectedError) {
        BlockService.instance().highlightNode(e.blockId);
      }
      toast.error(e.message);
      this.stop();
      callback();
    }
  }

  next() {
    if (this.isRunning) {
      console.log('[simulation] next');
      this.jumpNextBlock = true;
    }
  }

  continue() {
    if (this.isRunning) {
      console.log('[simulation] continue');
      if (this.action === SimulationActions.continue) {
        this.action = SimulationActions.debug;
        this.jumpNextBlock = false;
      } else {
        this.action = SimulationActions.continue;
      }
    }
  }

  stop() {
    if (this.isRunning) {
      console.log('[simulation] stop');
      this.action = SimulationActions.stop;
    }
  }

  run(callback) {
    this.isRunning = true;
    const parser = new FlowParser(BlockService.instance().getNodes(), BlockService.instance().getEdges());
    toast.info('Simulation started!');
    const x = () => {
      if (this.action !== SimulationActions.stop && parser.hasNext()) {
        if (this.action === SimulationActions.debug && this.jumpNextBlock) {
          this.jumpNextBlock = false;
          parser.parse();
        } else if (this.action === SimulationActions.continue) {
          parser.parse();
        }
        setTimeout(x, this.speedInMs);
      } else {
        toast.info('Simulation ended!');
        this.isRunning = false;
        BlockService.instance().highlightNode();
        callback();
      }
    };
    x();
  }
}
