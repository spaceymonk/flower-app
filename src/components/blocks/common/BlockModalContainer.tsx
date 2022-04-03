import React from 'react';
import { DecisionBlockModal, LoadBlockkModal, StartBlockModal, StatementBlockModal, StoreBlockModal, StopBlockModal, WhileLoopBlockModal } from '..';
import useToggle from '../../../hooks/useToggle';
import { Block, BlockTypes } from '../../../types';
import PropTypes from 'prop-types';
import { throwErrorIfUndefined } from '../../../services/common';

export function BlockModalContainer({ block }: BlockModalContainerProps) {
  const [activeModal, setActiveModal] = React.useState<BlockTypes | null>(null);
  const [showModal, toggleModal] = useToggle();

  React.useEffect(() => {
    if (block) {
      setActiveModal(throwErrorIfUndefined(block.type, 'block.type cannot be undefined'));
      toggleModal();
    }
  }, [block, toggleModal]);

  if (!block) return <></>;

  return showModal ? (
    <div>
      <StatementBlockModal block={block} show={activeModal === BlockTypes.STATEMENT_BLOCK} onClose={toggleModal} />
      <DecisionBlockModal block={block} show={activeModal === BlockTypes.DECISION_BLOCK} onClose={toggleModal} />
      <LoadBlockkModal block={block} show={activeModal === BlockTypes.LOAD_BLOCK} onClose={toggleModal} />
      <StoreBlockModal block={block} show={activeModal === BlockTypes.STORE_BLOCK} onClose={toggleModal} />
      <StartBlockModal block={block} show={activeModal === BlockTypes.START_BLOCK} onClose={toggleModal} />
      <StopBlockModal block={block} show={activeModal === BlockTypes.STOP_BLOCK} onClose={toggleModal} />
      <WhileLoopBlockModal block={block} show={activeModal === BlockTypes.WHILE_LOOP_BLOCK} onClose={toggleModal} />
    </div>
  ) : (
    <></>
  );
}

BlockModalContainer.propTypes = {
  block: PropTypes.object,
};

export interface BlockModalContainerProps extends PropTypes.InferProps<typeof BlockModalContainer.propTypes> {
  block: Block | null;
}
