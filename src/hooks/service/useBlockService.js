import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { applyNodeChanges } from 'react-flow-renderer';

export const GlowTypes = Object.freeze({
  NONE: 0,
  NORMAL: 1,
  ERROR: 2,
});

const useBlockService = () => {
  const { setNodes } = React.useContext(AppContext);

  const updateNode = React.useCallback(
    (id, updatedNode) => {
      setNodes((nodes) => nodes.map((n) => (n.id === id ? updatedNode : n)));
    },
    [setNodes]
  );

  const addNode = React.useCallback((node) => setNodes((nodes) => [...nodes, node]), [setNodes]);

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
    },
    [setNodes]
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
