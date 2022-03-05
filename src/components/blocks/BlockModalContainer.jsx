import React from 'react';
import { DecisionBlockModal, LoadBlockkModal, StatementBlockModal, StoreBlockModal } from '.';

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
    </div>
  );
}
