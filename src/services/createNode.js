import { v4 as uuid } from 'uuid';

export const BlockTypes = Object.freeze({
  DECISION_BLOCK: 'decision',
  STATEMENT_BLOCK: 'statement',
  LOAD_BLOCK: 'load',
  STORE_BLOCK: 'store',
  START_BLOCK: 'start',
  STOP_BLOCK: 'stop',
  WHILE_LOOP_BLOCK: 'while',
});

function createNode(type, pos) {
  return {
    id: uuid(),
    type: type,
    position: pos,
    data: { text: undefined, glow: undefined },
    parentNode: undefined,
  };
}

export default createNode;
