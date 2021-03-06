import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { GlowTypes, SimulationContextType } from '../../types';
import { throwErrorIfNull } from '../../util/common';
import { IBlockService } from '../IBlockService';
import { IConnectionService } from '../IConnectionService';
import { IFlowService } from '../IFlowService';
import { ISimulationService } from '../ISimulationService';

export class SimulationService implements ISimulationService {
  private _flowService: IFlowService;
  private _blockService: IBlockService;
  private _blockRepository: IBlockRepository;
  private _connectionService: IConnectionService;
  private _connectionRepository: IConnectionRepository;
  private _simulationContext: SimulationContextType;

  constructor(
    flowService: IFlowService,
    blockService: IBlockService,
    blockRepository: IBlockRepository,
    connectionService: IConnectionService,
    connectionRepository: IConnectionRepository,
    simulationContext: SimulationContextType
  ) {
    this._flowService = flowService;
    this._blockService = blockService;
    this._blockRepository = blockRepository;
    this._connectionService = connectionService;
    this._connectionRepository = connectionRepository;
    this._simulationContext = simulationContext;
  }

  public initialize(): void {
    this._simulationContext.stepCountRef.current = 0;
    const [startBlock] = this._flowService.validate();
    this.updateCurrentBlock(startBlock);
    this._simulationContext.variableTableRef.current = {
      Math: Math,
    };
  }

  public hasNext(): boolean {
    const currentBlock = this._simulationContext.currentBlockRef.current;
    if (currentBlock === null) return false;
    return this._connectionRepository.findAllBySourceId(currentBlock.id).length > 0;
  }

  public async process(): Promise<void> {
    const currentBlock = throwErrorIfNull(this._simulationContext.currentBlockRef.current, 'Current block is null');
    const handleId = await currentBlock.eval(this._simulationContext.variableTableRef.current, {
      inputHandler: this._simulationContext.inputHandler,
      outputHandler: this._simulationContext.outputHandler,
    });
    this.next(handleId);
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
    this._simulationContext.stepCountRef.current++;
    this._blockService.highlight([block.id], GlowTypes.NORMAL);
    this._connectionService.highlightByBlockId(block.id, GlowTypes.ANIMATE);
  }
}
