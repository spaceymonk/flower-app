import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { applyNodeChanges, useUpdateNodeInternals } from 'react-flow-renderer';

export const GlowTypes = Object.freeze({
  NONE: 0,
  NORMAL: 1,
  ERROR: 2,
});

const useBlockService = () => {
  const { setNodes } = React.useContext(AppContext);
  const updateNodeInternals = useUpdateNodeInternals();

  const updateNode = React.useCallback(
    (id, updatedNode) => {
      setNodes((nodes) => nodes.map((n) => (n.id === id ? updatedNode : n)));
      updateNodeInternals(id);
    },
    [setNodes, updateNodeInternals]
  );

  const addNode = React.useCallback(
    (node) => {
      setNodes((nodes) => nodes.concat(node));
      updateNodeInternals(node.id);
    },
    [setNodes, updateNodeInternals]
  );

  const removeNode = React.useCallback(
    (node) => setNodes((nodes) => nodes.filter((n) => n.id !== node.id)),
    [setNodes]
  );

  const highlightNode = React.useCallback(
    (id, glowType = GlowTypes.NONE) => {
      setNodes((nodes) => {
        return nodes.map((n) => {
          if (n.id === id) {
            n.data.glow = glowType;
          } else {
            n.data.glow = GlowTypes.NONE;
          }
          return n;
        });
      });
      updateNodeInternals(id);
    },
    [setNodes, updateNodeInternals]
  );

  const onNodesChange = React.useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);

  return {
    updateNode,
    addNode,
    removeNode,
    highlightNode,
    onNodesChange,
  };
};

export default useBlockService;
