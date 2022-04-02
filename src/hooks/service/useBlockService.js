import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { useReactFlow } from 'react-flow-renderer';
import { toast } from 'react-toastify';
import { clearParentNode, getParentNode, includesNode } from '../../services/BlockHelper';
import useEdgeService from './useEdgeService';

export const GlowTypes = Object.freeze({
  NONE: 0,
  NORMAL: 1,
  ERROR: 2,
});

const useBlockService = () => {
  const { setNodes, getNodes } = React.useContext(AppContext);
  const { getConnectedEdges, removeEdge } = useEdgeService();
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

  const removeNode = React.useCallback(
    (node) =>
      setNodes((nodes) => {
        const newNodes = [];
        nodes.forEach((n) => {
          if (n.id !== node.id) {
            if (n.parentNode === node.id) {
              clearParentNode(n);
              n.position = { x: n.position.x + node.position.x, y: n.position.y + node.position.y };
            }
            newNodes.push(n);
          }
        });
        return newNodes;
      }),
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

  const getChildNodes = React.useCallback(
    (node) => {
      const nodes = getNodes();
      const childNodes = nodes.filter((n) => n.parentNode === node.id);
      return childNodes;
    },
    [getNodes]
  );

  const updateParentNode = React.useCallback(
    (parentNode, children) => {
      let position = { x: 0, y: 0 };
      const nextPosition = () => {
        position = {
          x: position.x + 15,
          y: position.y + 15,
        };
        return position;
      };

      const nodeList = getNodes();
      let parent = getParentNode(nodeList, parentNode);
      while (parent) {
        for (const child of children) {
          if (child.id === parent.id) {
            toast.error('Cannot add parent node as child');
            return;
          }
        }
        parent = getParentNode(nodeList, parent);
      }

      setNodes((nodes) => {
        const remainingNodes = nodes.filter((n) => !includesNode(children, n));
        const updatedChildren = children.map((n) => {
          if (n.parentNode !== parentNode.id) {
            removeEdge(getConnectedEdges(n.id));
            n.parentNode = parentNode.id;
            n.extent = 'parent';
            n.position = nextPosition();
          }
          return n;
        });
        return [...remainingNodes, ...updatedChildren];
      });
    },
    [getNodes, setNodes, removeEdge, getConnectedEdges]
  );

  const removeChildNodes = React.useCallback(
    (parent, children) => {
      let position = { x: parent.position.x, y: parent.position.y };
      const nextPosition = () => {
        position = {
          x: position.x - 15,
          y: position.y - 15,
        };
        return position;
      };

      setNodes((nodes) =>
        nodes.map((n) => {
          for (const c of children) {
            removeEdge(getConnectedEdges(c.id));
            if (n.id === c.id) {
              clearParentNode(n);
              n.position = nextPosition();
            }
          }
          return n;
        })
      );
    },
    [getConnectedEdges, removeEdge, setNodes]
  );

  return {
    updateNode,
    addNode: addNodes,
    removeNode,
    highlightNode,
    focusNode,
    getChildNodes,
    updateParentNode,
    removeChildNodes,
  };
};

export default useBlockService;
