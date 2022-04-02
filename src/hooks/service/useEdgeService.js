import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { addEdge, updateEdge } from 'react-flow-renderer';
import createEdge from '../../services/createEdge';
import { includesEdge } from '../../services/EdgeHelper';

const useEdgeService = () => {
  const { setEdges, getEdges, getNodes } = React.useContext(AppContext);

  const onConnect = React.useCallback(
    (connection) => {
      if (connection.source === connection.target) {
        return;
      }
      const source = getNodes().find((node) => node.id === connection.source);
      const target = getNodes().find((node) => node.id === connection.target);

      if (
        (connection.targetHandle === 'inner-target' && source.parentNode !== connection.target) ||
        (connection.targetHandle === 'outer-target' && source.parentNode === connection.target) ||
        (connection.sourceHandle === 'inner-source' && target.parentNode !== connection.source) ||
        (connection.sourceHandle === 'outer-source' && target.parentNode === connection.source)
      ) {
        return;
      }

      return setEdges((eds) => {
        for (const e of eds) {
          if (e.source === connection.source && connection.sourceHandle === e.sourceHandle) {
            return eds;
          }
        }
        const edge = createEdge(connection);
        return addEdge(edge, eds);
      });
    },
    [setEdges, getNodes]
  );

  const onEdgeUpdate = (oldEdge, connection) => {
    // check for self connection
    if (connection.source === connection.target) {
      return;
    }

    const source = getNodes().find((node) => node.id === connection.source);
    const target = getNodes().find((node) => node.id === connection.target);

    if (
      (connection.targetHandle === 'inner-target' && source.parentNode !== connection.target) ||
      (connection.targetHandle === 'outer-target' && source.parentNode === connection.target) ||
      (connection.sourceHandle === 'inner-source' && target.parentNode !== connection.source) ||
      (connection.sourceHandle === 'outer-source' && target.parentNode === connection.source)
    ) {
      return;
    }

    return setEdges((eds) => {
      // check for same edge
      for (const e of eds) {
        if (e.source === connection.source && e.sourceHandle === connection.sourceHandle && oldEdge.id !== e.id) {
          return eds;
        }
        if (
          e.source === connection.source &&
          e.sourceHandle === connection.sourceHandle &&
          e.target === connection.target &&
          e.targetHandle === connection.targetHandle
        ) {
          return eds;
        }
      }

      return updateEdge(oldEdge, connection, eds);
    });
  };

  const getConnectedEdges = React.useCallback(
    (nodeId) => {
      const edges = getEdges();
      return edges.filter((e) => e.source === nodeId || e.target === nodeId);
    },
    [getEdges]
  );

  const removeEdge = React.useCallback(
    (edgeIds) => {
      if (Array.isArray(edgeIds)) {
        return setEdges((eds) => eds.filter((e) => !includesEdge(edgeIds, e)));
      }
      return setEdges((eds) => eds.filter((e) => e.id !== edgeIds));
    },
    [setEdges]
  );

  return {
    onConnect,
    onEdgeUpdate,
    getConnectedEdges,
    removeEdge,
  };
};

export default useEdgeService;
