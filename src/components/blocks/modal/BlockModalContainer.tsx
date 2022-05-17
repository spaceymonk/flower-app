import React from 'react';
import { DecisionBlockModal, LoadBlockkModal, StartBlockModal, StatementBlockModal, StoreBlockModal, StopBlockModal, WhileLoopBlockModal } from '..';
import useToggle from '../../../hooks/useToggle';
import { BlockTypes } from '../../../types';
import PropTypes from 'prop-types';
import { throwErrorIfUndefined } from '../../../util';
import Block from '../../../model/Block';

export function BlockModalContainer({ block }: BlockModalContainerProps) {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [showModal, toggleModal] = useToggle();

  React.useEffect(() => {
    if (block) {
      setActiveModal(throwErrorIfUndefined(block.type));
      toggleModal();
    }
  }, [block, toggleModal]);

  if (!block) return <></>;

  return (
    <div>
      <StatementBlockModal block={block} show={showModal && activeModal === BlockTypes.STATEMENT_BLOCK} onClose={toggleModal} />
      <DecisionBlockModal block={block} show={showModal && activeModal === BlockTypes.DECISION_BLOCK} onClose={toggleModal} />
      <LoadBlockkModal block={block} show={showModal && activeModal === BlockTypes.LOAD_BLOCK} onClose={toggleModal} />
      <StoreBlockModal block={block} show={showModal && activeModal === BlockTypes.STORE_BLOCK} onClose={toggleModal} />
      <StartBlockModal block={block} show={showModal && activeModal === BlockTypes.START_BLOCK} onClose={toggleModal} />
      <StopBlockModal block={block} show={showModal && activeModal === BlockTypes.STOP_BLOCK} onClose={toggleModal} />
      <WhileLoopBlockModal block={block} show={showModal && activeModal === BlockTypes.WHILE_LOOP_BLOCK} onClose={toggleModal} />
    </div>
  );
}

BlockModalContainer.propTypes = {
  block: PropTypes.object,
};

export interface BlockModalContainerProps extends PropTypes.InferProps<typeof BlockModalContainer.propTypes> {
  block: Block | null;
}
