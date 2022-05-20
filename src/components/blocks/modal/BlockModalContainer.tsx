import React from 'react';
import { DecisionBlockModal, LoadBlockkModal, StartBlockModal, StatementBlockModal, StoreBlockModal, StopBlockModal, WhileLoopBlockModal } from '..';
import { BlockTypes } from '../../../types';
import PropTypes from 'prop-types';
import Block from '../../../model/Block';

export function BlockModalContainer({ block, show, onClose }: BlockModalContainerProps) {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (block) {
      setActiveModal(block.type);
    }
  }, [block]);

  if (!block) return <></>;

  return (
    <div>
      <StatementBlockModal block={block} show={show && activeModal === BlockTypes.STATEMENT_BLOCK} onClose={onClose} />
      <DecisionBlockModal block={block} show={show && activeModal === BlockTypes.DECISION_BLOCK} onClose={onClose} />
      <LoadBlockkModal block={block} show={show && activeModal === BlockTypes.LOAD_BLOCK} onClose={onClose} />
      <StoreBlockModal block={block} show={show && activeModal === BlockTypes.STORE_BLOCK} onClose={onClose} />
      <StartBlockModal block={block} show={show && activeModal === BlockTypes.START_BLOCK} onClose={onClose} />
      <StopBlockModal block={block} show={show && activeModal === BlockTypes.STOP_BLOCK} onClose={onClose} />
      <WhileLoopBlockModal block={block} show={show && activeModal === BlockTypes.WHILE_LOOP_BLOCK} onClose={onClose} />
    </div>
  );
}

BlockModalContainer.propTypes = {
  block: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export interface BlockModalContainerProps extends PropTypes.InferProps<typeof BlockModalContainer.propTypes> {
  block: Block | null;
  show: boolean;
  onClose: () => void;
}
