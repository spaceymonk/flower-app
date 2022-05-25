import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { BlockTypes } from '../../types';
import { IAnalyzeService } from '../IAnalyzeService';
import { IFlowService } from '../IFlowService';

export class AnalyzeService implements IAnalyzeService {
  private _blockRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;
  private _flowService: IFlowService;

  constructor(blockRepository: IBlockRepository, connectionRepository: IConnectionRepository, flowService: IFlowService) {
    this._blockRepository = blockRepository;
    this._connectionRepository = connectionRepository;
    this._flowService = flowService;
  }

  public async getCyclomaticComplexity(): Promise<number> {
    return new Promise((yay, nay) => {
      try {
        this._flowService.validate();
      } catch (e) {
        console.error(e);
        nay('invalid flow');
      }
      const blockCount = this._blockRepository.countAll();
      const connectionCount = this._connectionRepository.countAll();
      const complexity = connectionCount - blockCount + 2;
      yay(complexity);
    });
  }

  public async getBlockCountByTypes(): Promise<{ [type in BlockTypes]: number }> {
    return new Promise((yay, nay) => {
      const blockCounts = this._blockRepository.countByTypes();
      yay(blockCounts);
    });
  }
}
