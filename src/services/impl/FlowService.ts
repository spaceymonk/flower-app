import { MultipleStartError, MultipleStopError, NoStartError, NoStopError, NotConnectedError } from '../../exceptions';
import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { BlockTypes, ValidationOptions } from '../../types';
import { IBlockService } from '../IBlockService';
import { IFlowService } from '../IFlowService';

export class FlowService implements IFlowService {
  private _blockService: IBlockService;
  private _blockRepository: IBlockRepository;
  private _connectionRepository: IConnectionRepository;

  constructor(blockService: IBlockService, blockRepository: IBlockRepository, connectionRepository: IConnectionRepository) {
    this._blockService = blockService;
    this._blockRepository = blockRepository;
    this._connectionRepository = connectionRepository;
  }

  public validate(options?: ValidationOptions): [Block, Block] {
    const blockIter = this._blockRepository.getAll();
    const startBlocks: Block[] = [];
    const stopBlocks: Block[] = [];

    let it = blockIter.next();
    while (!it.done) {
      const b = it.value;
      const connectionsCount = this._connectionRepository.countByBlocks(Array.of(b));
      if (b.type === BlockTypes.START_BLOCK) {
        startBlocks.push(b);
        if (connectionsCount < 1) throw new NotConnectedError(b.id);
      } else if (b.type === BlockTypes.STOP_BLOCK) {
        stopBlocks.push(b);
        if (connectionsCount < 1) throw new NotConnectedError(b.id);
      } else if (b.type === BlockTypes.DECISION_BLOCK) {
        if (connectionsCount < 3) throw new NotConnectedError(b.id);
      } else if (connectionsCount < 2) {
        throw new NotConnectedError(b.id);
      }
      it = blockIter.next();
    }

    if (startBlocks.length > 1) throw new MultipleStartError(startBlocks.map((b) => b.id));
    if (stopBlocks.length > 1) throw new MultipleStopError(stopBlocks.map((b) => b.id));
    if (options?.startMustPresent && startBlocks.length === 0) throw new NoStartError();
    if (options?.stopMustPresent && stopBlocks.length === 0) throw new NoStopError();

    return [startBlocks[0], stopBlocks[0]];
  }
}
