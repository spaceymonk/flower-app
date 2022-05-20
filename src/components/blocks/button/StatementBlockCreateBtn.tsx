import { faCode } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function StatementBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.STATEMENT_BLOCK}
      title={T.blocks.statement.title}
      description={T.blocks.statement.description}
      icon={faCode}
    />
  );
}
