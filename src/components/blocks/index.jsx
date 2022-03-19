import './style.css';
import { NodeComponent as DecisionBlockNC } from './DecisionBlock';
import { NodeComponent as StatementBlockNC } from './StatementBlock';
import { NodeComponent as StartBlockNC } from './StartBlock';
import { NodeComponent as StopBlockNC } from './StopBlock';
import { NodeComponent as LoadBlockNC } from './LoadBlock';
import { NodeComponent as StoreBlockNC } from './StoreBlock';

export { CreateButton as StatementBlockCreateButton } from './StatementBlock';
export { CreateButton as DecisionBlockCreateButton } from './DecisionBlock';
export { CreateButton as StartBlockCreateButton} from './StartBlock';
export { CreateButton as StopBlockCreateButton} from './StopBlock';
export { CreateButton as LoadBlockCreateButton } from './LoadBlock';
export { CreateButton as StoreBlockCreateButton } from './StoreBlock';
export { BlockModalContainer } from './BlockModalContainer';
export { BaseModal as StartBlockModal} from './BlockModal';
export { BaseModal as StopBlockModal} from './BlockModal';
export { BlockModal as StatementBlockModal } from './BlockModal';
export { BlockModal as DecisionBlockModal } from './BlockModal';
export { BlockModal as LoadBlockkModal } from './BlockModal';
export { BlockModal as StoreBlockModal } from './BlockModal';

export const nodeTypes = {
  statement: StatementBlockNC,
  decision : DecisionBlockNC,
  start : StartBlockNC,
  stop : StopBlockNC,
  load : LoadBlockNC,
  store : StoreBlockNC,
};
