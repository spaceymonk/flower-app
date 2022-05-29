import { faAtom } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function FunctionBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.FUNCTION_BLOCK}
      title={T.blocks.function.title}
      description={T.blocks.function.description}
      icon={faAtom}
    />
  );
}
