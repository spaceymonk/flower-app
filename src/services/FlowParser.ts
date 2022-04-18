import { Edge, getConnectedEdges, getOutgoers } from 'react-flow-renderer';
import { MultipleStartError, MultipleStopError, NoStartError, NoStopError, NotConnectedError } from '../exceptions';
import { InvalidDecisionError } from '../exceptions/InvalidDecisionError';
import { Block, BlockTypes } from '../types';
import { throwErrorIfUndefined } from '../util';
import { includesBlock } from './BlockHelper';

export type PathMapping = { [key: string]: Block };

/* -------------------------------------------------------------------------- */
/*                              mapDecisionPaths                              */
/* -------------------------------------------------------------------------- */
export const mapDecisionPaths = (start: Block, blocks: Block[], edges: Edge[], mapping: PathMapping = {}): PathMapping => {
  if (start.type !== BlockTypes.DECISION_BLOCK) {
    throw new Error('start block must be a decision block');
  }
  const queue: Block[] = getOutgoers(start, blocks, edges);
  const visited: Block[] = [];
  while (queue.length > 0) {
    const current = throwErrorIfUndefined(queue.shift());
    if (includesBlock(visited, current)) {
      mapping[start.id] = current;
      return mapping;
    }
    visited.push(current);
    const outgoers = getOutgoers(current, blocks, edges);
    if (current.type === BlockTypes.DECISION_BLOCK) {
      if (!mapping[current.id]) mapDecisionPaths(current, blocks, edges, mapping);
      queue.push(mapping[current.id]);
    } else if (current.type === BlockTypes.WHILE_LOOP_BLOCK) {
      // pass the body of the container block
      if (outgoers[0].parentNode === current.id) queue.push(outgoers[1]);
      else queue.push(outgoers[0]);
    } else {
      queue.push(...outgoers);
    }
  }

  throw new InvalidDecisionError(start.id);
};

/* -------------------------------------------------------------------------- */
/*                                validateFlow                                */
/* -------------------------------------------------------------------------- */
export const validateFlow = (blocks: Block[], edges: Edge[]): [Block, Block] => {
  const startBlocks: Block[] = [];
  const stopBlocks: Block[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const n = blocks[i];
    const connectedEdgeCount = getConnectedEdges([n], edges).length;
    if (n.type === BlockTypes.START_BLOCK) {
      startBlocks.push(n);
      if (connectedEdgeCount < 1) throw new NotConnectedError(n.id);
    } else if (n.type === BlockTypes.STOP_BLOCK) {
      stopBlocks.push(n);
      if (connectedEdgeCount < 1) throw new NotConnectedError(n.id);
    } else if (n.type === BlockTypes.DECISION_BLOCK) {
      if (connectedEdgeCount < 3) throw new NotConnectedError(n.id);
    } else if (connectedEdgeCount < 2) {
      throw new NotConnectedError(n.id);
    }
  }
  if (startBlocks.length > 1) throw new MultipleStartError(startBlocks.map((b) => b.id));
  if (stopBlocks.length > 1) throw new MultipleStopError(stopBlocks.map((b) => b.id));
  if (startBlocks.length === 0) throw new NoStartError();
  if (stopBlocks.length === 0) throw new NoStopError();

  return [startBlocks[0], stopBlocks[0]];
};
