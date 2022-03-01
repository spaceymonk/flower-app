import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import { StatementBlockModal } from '.';

export function BlockModalContainer({ node }) {
  const { setNodes } = useReactFlow();
  const [statementModal, setStatementModal] = React.useState(false);

  React.useEffect(() => {
    setStatementModal(node?.type === 'statement');
  }, [node]);

  function handleSave(updatedNode) {
    setStatementModal(false);
    setNodes((nodes) => nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
  }

  return (
    <div>
      <StatementBlockModal
        node={node}
        show={statementModal}
        onSave={handleSave}
        onClose={() => setStatementModal(false)} />
    </div>
  );
}
