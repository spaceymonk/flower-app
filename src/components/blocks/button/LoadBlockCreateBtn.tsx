import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function LoadBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.LOAD_BLOCK}
      title={T.blocks.load.title}
      description={T.blocks.load.description}
      icon={faTruckLoading}
    />
  );
}
