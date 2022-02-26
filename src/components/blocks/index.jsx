import './style.css';
import { NodeComponent as StatementBlockNC } from './StatementBlock';
export { CreateButton as StatementBlockCreateButton } from '../blocks/StatementBlock';
export { NodeModal as StatementBlockModal } from '../blocks/StatementBlock';

export const nodeTypes = {
  statement: StatementBlockNC,
};
