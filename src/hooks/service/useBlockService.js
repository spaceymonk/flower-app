import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { useReactFlow } from 'react-flow-renderer';

export const GlowTypes = Object.freeze({
  NONE: 0,
  NORMAL: 1,
  ERROR: 2,
});

const useBlockService = () => {
  const { setNodes } = React.useContext(AppContext);
  const { addNodes, setCenter } = useReactFlow();

  const updateNode = React.useCallback(
    (id, changeData) => {
      setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id === id) {
            n.data = {
              ...n.data,
              ...changeData,
            };
          }
          return n;
        })
      );
    },
    [setNodes]
  );

  const addNode = React.useCallback((node) => addNodes(node), [addNodes]);

  const removeNode = React.useCallback(
    (node) => setNodes((nodes) => nodes.filter((n) => n.id !== node.id)),
    [setNodes]
  );

  const highlightNode = React.useCallback(
    (ids, glowType = GlowTypes.NONE) => {
      setNodes((nodes) => {
        return nodes.map((n) => {
          if ((Array.isArray(ids) && ids.includes(n.id)) || n.id === ids) {
            updateNode(n.id, { glow: glowType });
          } else {
            updateNode(n.id, { glow: GlowTypes.NONE });
          }
          return n;
        });
      });
    },
    [setNodes, updateNode]
  );

  const focusNode = React.useCallback(
    (node) => {
      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = 1.85;
      setCenter(x, y, { zoom, duration: 1000 });
    },
    [setCenter]
  );

  return {
    updateNode,
    addNode,
    removeNode,
    highlightNode,
    focusNode,
  };
};

export default useBlockService;
