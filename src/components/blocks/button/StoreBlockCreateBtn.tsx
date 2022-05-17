import { faPrint } from '@fortawesome/free-solid-svg-icons';
import T from '../../../config/MessageConstants';
import BlockCreateButton from './BlockCreateBtn';
import { BlockTypes } from '../../../types';

export function StoreBlockCreateBtn() {
  return (
    <BlockCreateButton
      type={BlockTypes.STORE_BLOCK}
      title={T.blocks.store.title}
      description={T.blocks.store.description}
      icon={faPrint}
    />
  );
}
