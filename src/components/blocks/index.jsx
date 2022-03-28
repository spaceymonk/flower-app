import './style.css';
import { NodeComponent as DecisionBlockNC } from './items/DecisionBlock';
import { NodeComponent as StatementBlockNC } from './items/StatementBlock';
import { NodeComponent as StartBlockNC } from './items/StartBlock';
import { NodeComponent as StopBlockNC } from './items/StopBlock';
import { NodeComponent as LoadBlockNC } from './items/LoadBlock';
import { NodeComponent as StoreBlockNC } from './items/StoreBlock';
import { NodeComponent as WhileLoopBlockNC } from './items/WhileLoopBlock';

export { CreateButton as StatementBlockCreateButton } from './items/StatementBlock';
export { CreateButton as DecisionBlockCreateButton } from './items/DecisionBlock';
export { CreateButton as StartBlockCreateButton } from './items/StartBlock';
export { CreateButton as StopBlockCreateButton } from './items/StopBlock';
export { CreateButton as LoadBlockCreateButton } from './items/LoadBlock';
export { CreateButton as StoreBlockCreateButton } from './items/StoreBlock';
export { CreateButton as WhileLoopBlockCreateButton } from './items/WhileLoopBlock';
export { BlockModalContainer } from './common/BlockModalContainer';
export { BaseModal as StartBlockModal } from './common/BaseModal';
export { BaseModal as StopBlockModal } from './common/BaseModal';
export { BlockModal as StatementBlockModal } from './common/BlockModal';
export { BlockModal as DecisionBlockModal } from './common/BlockModal';
export { BlockModal as LoadBlockkModal } from './common/BlockModal';
export { BlockModal as StoreBlockModal } from './common/BlockModal';
export { BlockModal as WhileLoopBlockModal } from './common/BlockModal';

export const nodeTypes = {
  statement: StatementBlockNC,
  decision: DecisionBlockNC,
  start: StartBlockNC,
  stop: StopBlockNC,
  load: LoadBlockNC,
  store: StoreBlockNC,
  while: WhileLoopBlockNC,
};
