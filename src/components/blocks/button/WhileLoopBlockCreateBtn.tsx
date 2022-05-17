import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function WhileLoopBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.WHILE_LOOP_BLOCK}
      title={T.blocks.while.title}
      description={T.blocks.while.description}
      icon={faRepeat}
    />
  );
}
