import './style.css';
import { NodeComponent as DecisionBlockNC } from './DecisionBlock';
import { NodeComponent as StatementBlockNC } from './StatementBlock';

export { BlockModalContainer } from './BlockModalContainer';
export { CreateButton as StatementBlockCreateButton } from './StatementBlock';
export { NodeModal as StatementBlockModal } from './StatementBlock';
export { CreateButton as DecisionBlockCreateButton } from './DecisionBlock';
export { NodeModal as DecisionBlockModal } from './DecisionBlock';

export const nodeTypes = {
  statement: StatementBlockNC,
  decision : DecisionBlockNC,
};
