import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { AppContextType, GlowTypes, SimulationContextType } from '../../types';
import { throwErrorIfNull } from '../../util';
import { IBlockService } from '../IBlockService';
import { IFlowService } from '../IFlowService';
import { ISimulationService } from '../ISimulationService';

export class SimulationService implements ISimulationService {
  private _flowService: IFlowService;
  private _blockService: IBlockService;
  private _blockRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;
  private _simulationContext: SimulationContextType;
  private _appContext: AppContextType;

  constructor(
    flowService: IFlowService,
    blockService: IBlockService,
    blockRepository: IBlockRepository,
    connectionRepository: IConnectionRepository,
    context: SimulationContextType,
    appContext: AppContextType
  ) {
    this._flowService = flowService;
    this._blockService = blockService;
    this._blockRepository = blockRepository;
    this._connectionRepository = connectionRepository;
    this._simulationContext = context;
    this._appContext = appContext;
  }

  public initialize(): void {
    const [startBlock] = this._flowService.validate();
    this.updateCurrentBlock(startBlock);
    this._simulationContext.inputParamCursorRef.current = 0;
    this._simulationContext.variableTableRef.current = {};
  }

  public hasNext(): boolean {
    const currentBlock = this._simulationContext.currentBlockRef.current;
    if (currentBlock === null) return false;
    return this._connectionRepository.findAllBySourceId(currentBlock.id).length > 0;
  }

  public process(): void {
    const currentBlock = throwErrorIfNull(this._simulationContext.currentBlockRef.current, 'Current block is null');
    const nextBlock = currentBlock.eval(this._simulationContext.variableTableRef, {
      inputParams: this._appContext.getInputParams(),
      inputParamIter: this._simulationContext.inputParamCursorRef,
    });
    this.next(nextBlock);
  }

  private next(handleId: string | null): void {
    const currentBlock = throwErrorIfNull(this._simulationContext.currentBlockRef.current, 'Current block is null');
    const c = this._connectionRepository
      .findBySourceHandleAndSourceId(handleId, currentBlock.id)
      .orElseThrow(new Error('No connection found for current block'));
    const b = this._blockRepository.findById(c.targetId).orElseThrow(new Error('No block found for connection'));
    this.updateCurrentBlock(b);
  }

  private updateCurrentBlock(block: Block): void {
    this._simulationContext.currentBlockRef.current = block;
    this._blockService.highlight([block.id], GlowTypes.NORMAL);
  }
}
