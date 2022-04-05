import { Edge, getConnectedEdges, getOutgoers } from 'react-flow-renderer';
import { CircularDependencyError, MultipleStartError, MultipleStopError, NoStartError, NoStopError, NotConnectedError } from '../exceptions';
import { Block, BlockTypes, ContainerBlockHandle } from '../types';
import { throwErrorIfUndefined } from '../util';
import { includesBlock } from './BlockHelper';
import { findAllByPair } from './EdgeHelper';

/* -------------------------------------------------------------------------- */
/*                                validateFlow                                */
/* -------------------------------------------------------------------------- */
export const validateFlow = (blocks: Block[], edges: Edge[]): Block => {
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

  // check for circular depencies
  const visited: Block[] = [];
  const stack: Block[] = [startBlocks[0]];
  while (stack.length !== 0) {
    const iter: Block = throwErrorIfUndefined(stack.pop());
    if (!includesBlock(visited, iter)) {
      visited.push(iter);
      const outgoers: Block[] = getOutgoers(iter, blocks, edges);
      for (let i = 0; i < outgoers.length; i++) {
        const outgoer = outgoers[i];
        if (includesBlock(visited, outgoer)) {
          // check connected handle, it may be container block
          const connectedEdges = findAllByPair(edges, iter.id, outgoer.id);
          connectedEdges?.forEach((e) => {
            if (e.targetHandle !== ContainerBlockHandle.INNER_TARGET) {
              throw new CircularDependencyError([iter.id, outgoer.id]);
            }
          });
        }
        stack.push(outgoer);
      }
    }
  }

  return startBlocks[0];
};
