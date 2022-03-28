import React from 'react';
import {
  DecisionBlockModal,
  LoadBlockkModal,
  StartBlockModal,
  StatementBlockModal,
  StoreBlockModal,
  StopBlockModal,
  WhileLoopBlockModal,
} from '..';
import useToggle from '../../../hooks/useToggle';
import { BlockTypes } from '../../../services/createNode';

export function BlockModalContainer({ node }) {
  const [activeModal, setActiveModal] = React.useState('');
  const [showModal, toggleModal] = useToggle();

  React.useEffect(() => {
    if (node) {
      setActiveModal(node.type);
      toggleModal();
    }
  }, [node, toggleModal]);

  return (
    <div>
      <StatementBlockModal node={node} show={showModal && activeModal === BlockTypes.STATEMENT_BLOCK} onClose={toggleModal} />
      <DecisionBlockModal node={node} show={showModal && activeModal ===BlockTypes.DECISION_BLOCK} onClose={toggleModal} />
      <LoadBlockkModal node={node} show={showModal && activeModal === BlockTypes.LOAD_BLOCK} onClose={toggleModal} />
      <StoreBlockModal node={node} show={showModal && activeModal === BlockTypes.STORE_BLOCK} onClose={toggleModal} />
      <StartBlockModal node={node} show={showModal && activeModal === BlockTypes.START_BLOCK} onClose={toggleModal} />
      <StopBlockModal node={node} show={showModal && activeModal === BlockTypes.STOP_BLOCK} onClose={toggleModal} />
      <WhileLoopBlockModal node={node} show={showModal && activeModal === BlockTypes.WHILE_LOOP_BLOCK} onClose={toggleModal} />
    </div>
  );
}
