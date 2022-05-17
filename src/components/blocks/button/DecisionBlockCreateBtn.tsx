import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function DecisionBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.DECISION_BLOCK}
      title={T.blocks.decision.title}
      description={T.blocks.decision.description}
      icon={faCodeBranch}
    />
  );
}
