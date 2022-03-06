import React from 'react';
import {
  DecisionBlockModal,
  LoadBlockkModal,
  StartBlockModal,
  StatementBlockModal,
  StoreBlockModal,
  StopBlockModal,
} from '.';

export function BlockModalContainer({ node }) {
  const [activeModal, setActiveModal] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    if (node) {
      setActiveModal(node.type);
      setShowModal(true);
    }
  }, [node]);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <StatementBlockModal node={node} show={showModal && activeModal === 'statement'} onClose={handleClose} />
      <DecisionBlockModal node={node} show={showModal && activeModal === 'decision'} onClose={handleClose} />
      <LoadBlockkModal node={node} show={showModal && activeModal === 'load'} onClose={handleClose} />
      <StoreBlockModal node={node} show={showModal && activeModal === 'store'} onClose={handleClose} />
      <StartBlockModal node={node} show={showModal && activeModal === 'start'} onClose={handleClose} />
      <StopBlockModal node={node} show={showModal && activeModal === 'stop'} onClose={handleClose} />
    </div>
  );
}
