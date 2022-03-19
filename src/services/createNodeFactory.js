import { v4 as uuid } from 'uuid';

export const BlockTypes = Object.freeze({
  DECISION_BLOCK: 'decision',
  STATEMENT_BLOCK: 'statement',
  LOAD_BLOCK: 'load',
  STORE_BLOCK: 'store',
  START_BLOCK: 'start',
  STOP_BLOCK: 'stop',
});

function createNodeFactory(type, pos) {
  return {
    id: uuid(),
    type: type,
    position: pos,
    data: { text: undefined, glow: undefined },
  };
}

export default createNodeFactory;
