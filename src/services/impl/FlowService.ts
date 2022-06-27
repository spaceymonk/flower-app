import { InvalidDecisionError, MultipleStartError, MultipleStopError, NoStartError, NoStopError, NotConnectedError } from '../../exceptions';
import Block from '../../model/Block';
import { IBlockRepository } from '../../repositories/IBlockRepository';
import { IConnectionRepository } from '../../repositories/IConnectionRepository';
import { BlockTypes, PathMapping, ValidationOptions } from '../../types';
import { throwErrorIfUndefined } from '../../util/common';
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

  public mapDecisionPaths(start: Block, mapping: PathMapping = {}): PathMapping {
    if (start.type !== BlockTypes.DECISION_BLOCK) {
      throw new Error('start block must be a decision block');
    }
    const queue: Block[] = this._blockService.getOutgoers(start);
    const visited = new Set();
    while (queue.length > 0) {
      const current = throwErrorIfUndefined(queue.shift());
      if (visited.has(current)) {
        mapping[start.id] = current;
        return mapping;
      }
      visited.add(current);
      const outgoers = this._blockService.getOutgoers(current);
      if (current.type === BlockTypes.DECISION_BLOCK) {
        if (!mapping[current.id]) this.mapDecisionPaths(current, mapping);
        queue.push(mapping[current.id]);
      } else if (current.isContainer()) {
        // pass the body of the container block
        if (outgoers[0].parentNodeId === current.id) queue.push(outgoers[1]);
        else queue.push(outgoers[0]);
      } else {
        queue.push(...outgoers);
      }
    }

    throw new InvalidDecisionError(start.id);
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
