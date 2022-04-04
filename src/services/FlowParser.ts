import { Edge, getConnectedEdges } from 'react-flow-renderer';
import { MultipleStartError, MultipleStopError, NoStartError, NoStopError, NotConnectedError } from '../exceptions';
import { Block, BlockTypes } from '../types';

/* -------------------------------------------------------------------------- */
/*                                validateFlow                                */
/* -------------------------------------------------------------------------- */
export const validateFlow = (nodes: Block[], edges: Edge[]): Block => {
  const startBlocks = [];
  const stopBlocks = [];

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
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

  return startBlocks[0];
};
