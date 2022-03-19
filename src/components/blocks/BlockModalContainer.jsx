import React from 'react';
import {
  DecisionBlockModal,
  LoadBlockkModal,
  StartBlockModal,
  StatementBlockModal,
  StoreBlockModal,
  StopBlockModal,
} from '.';
import useToggle from '../../hooks/useToggle';

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
      <StatementBlockModal node={node} show={showModal && activeModal === 'statement'} onClose={toggleModal} />
      <DecisionBlockModal node={node} show={showModal && activeModal === 'decision'} onClose={toggleModal} />
      <LoadBlockkModal node={node} show={showModal && activeModal === 'load'} onClose={toggleModal} />
      <StoreBlockModal node={node} show={showModal && activeModal === 'store'} onClose={toggleModal} />
      <StartBlockModal node={node} show={showModal && activeModal === 'start'} onClose={toggleModal} />
      <StopBlockModal node={node} show={showModal && activeModal === 'stop'} onClose={toggleModal} />
    </div>
  );
}
