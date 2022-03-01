import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import { DecisionBlockModal, StatementBlockModal } from '.';

export function BlockModalContainer({ node }) {
  const { setNodes } = useReactFlow();
  const [statementModal, setStatementModal] = React.useState(false);
  const [decisionModal, setDecisionModal] = React.useState(false);

  React.useEffect(() => {
    setStatementModal(node?.type === 'statement');
    setDecisionModal(node?.type === 'decision');
  }, [node]);

  function handleSave(updatedNode) {
    setStatementModal(false);
    setDecisionModal(false);
    setNodes((nodes) => nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
  }

  return (
    <div>
      <StatementBlockModal
        node={node}
        show={statementModal}
        onSave={handleSave}
        onClose={() => setStatementModal(false)}
      />
      <DecisionBlockModal
        node={node}
        show={decisionModal}
        onSave={handleSave}
        onClose={() => setDecisionModal(false)}
      />
    </div>
  );
}
