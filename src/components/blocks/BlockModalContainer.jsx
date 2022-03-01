import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import { DecisionBlockModal, StatementBlockModal } from '.';

export function BlockModalContainer({ node }) {
  const { setNodes } = useReactFlow();
  const [activeModal, setActiveModal] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    if (node) {
      setActiveModal(node.type);
      setShowModal(true);
    }
  }, [node]);

  function handleSave(updatedNode) {
    setShowModal(false);
    setNodes((nodes) => nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
  }

  return (
    <div>
      <StatementBlockModal
        node={node}
        show={showModal && activeModal === 'statement'}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
      />
      <DecisionBlockModal
        node={node}
        show={showModal && activeModal === 'decision'}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
