import { faCircleStop } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function StopBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.STOP_BLOCK}
      title={T.blocks.stop.title}
      description={T.blocks.stop.description}
      icon={faCircleStop}
    />
  );
}
