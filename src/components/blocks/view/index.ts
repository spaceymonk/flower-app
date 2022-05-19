import { DecisionBlockView } from './DecisionBlockView';
import { StatementBlockView } from './StatementBlockView';
import { StartBlockView } from './StartBlockView';
import { StopBlockView } from './StopBlockView';
import { LoadBlockView } from './LoadBlockView';
import { StoreBlockView } from './StoreBlockView';
import { WhileLoopBlockView } from './WhileContainerView';

export const nodeTypes = {
  statement: StatementBlockView,
  decision: DecisionBlockView,
  start: StartBlockView,
  stop: StopBlockView,
  load: LoadBlockView,
  store: StoreBlockView,
  while: WhileLoopBlockView,
};
