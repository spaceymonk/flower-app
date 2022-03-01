import './style.css';
import { NodeComponent as DecisionBlockNC } from './DecisionBlock';
import { NodeComponent as StatementBlockNC } from './StatementBlock';
import { NodeComponent as StartBlockNC } from './StartBlock';
import { NodeComponent as StopBlockNC } from './StopBlock';

export { BlockModalContainer } from './BlockModalContainer';
export { CreateButton as StatementBlockCreateButton } from './StatementBlock';
export { NodeModal as StatementBlockModal } from './StatementBlock';
export { CreateButton as DecisionBlockCreateButton } from './DecisionBlock';
export { NodeModal as DecisionBlockModal } from './DecisionBlock';
export { CreateButton as StartBlockCreateButton} from './StartBlock';
export { CreateButton as StopBlockCreateButton} from './StopBlock';

export const nodeTypes = {
  statement: StatementBlockNC,
  decision : DecisionBlockNC,
  start : StartBlockNC,
  stop : StopBlockNC,
};
