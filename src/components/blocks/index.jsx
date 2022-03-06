import './style.css';
import { NodeComponent as DecisionBlockNC } from './DecisionBlock';
import { NodeComponent as StatementBlockNC } from './StatementBlock';
import { NodeComponent as StartBlockNC } from './StartBlock';
import { NodeComponent as StopBlockNC } from './StopBlock';
import { NodeComponent as LoadBlockNC } from './LoadBlock';
import { NodeComponent as StoreBlockNC } from './StoreBlock';

export { BlockModalContainer } from './BlockModalContainer';
export { CreateButton as StatementBlockCreateButton } from './StatementBlock';
export { NodeModal as StatementBlockModal } from './StatementBlock';
export { CreateButton as DecisionBlockCreateButton } from './DecisionBlock';
export { NodeModal as DecisionBlockModal } from './DecisionBlock';
export { CreateButton as StartBlockCreateButton} from './StartBlock';
export { NodeModal as StartBlockModal} from './StartBlock';
export { CreateButton as StopBlockCreateButton} from './StopBlock';
export { NodeModal as StopBlockModal} from './StopBlock';
export { CreateButton as LoadBlockCreateButton } from './LoadBlock';
export { NodeModal as LoadBlockkModal } from './LoadBlock';
export { CreateButton as StoreBlockCreateButton } from './StoreBlock';
export { NodeModal as StoreBlockModal } from './StoreBlock';

export const nodeTypes = {
  statement: StatementBlockNC,
  decision : DecisionBlockNC,
  start : StartBlockNC,
  stop : StopBlockNC,
  load : LoadBlockNC,
  store : StoreBlockNC,
};
