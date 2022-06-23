import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { BlockTypes, SimulationContextType } from '../../types';
import { IAnalyzeService } from '../IAnalyzeService';
import { IFlowService } from '../IFlowService';

export class AnalyzeService implements IAnalyzeService {
  private _blockRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;
  private _flowService: IFlowService;
  private _simulationContext: SimulationContextType;

  constructor(
    blockRepository: IBlockRepository,
    connectionRepository: IConnectionRepository,
    flowService: IFlowService,
    simulationContext: SimulationContextType
  ) {
    this._blockRepository = blockRepository;
    this._connectionRepository = connectionRepository;
    this._flowService = flowService;
    this._simulationContext = simulationContext;
  }

  public async getCyclomaticComplexity(): Promise<number> {
    return new Promise((yay, nay) => {
      try {
        this._flowService.validate();
      } catch (e) {
        console.error(e);
        nay('Invalid flow');
      }
      const blockCount = this._blockRepository.countAll();
      const connectionCount = this._connectionRepository.countAll();
      const complexity = connectionCount - blockCount + 2;
      yay(complexity);
    });
  }

  public async getBlockCountByTypes(): Promise<{ [type in BlockTypes]?: number }> {
    return new Promise((yay, nay) => {
      const blockCounts = this._blockRepository.countByTypes();
      yay(blockCounts);
    });
  }

  public async getStepCount(): Promise<number> {
    return new Promise((yay, nay) => {
      const stepCount = this._simulationContext.stepCountRef.current;
      yay(stepCount);
    });
  }

  public clear(): void {
    this._simulationContext.stepCountRef.current = 0;
  }
}
