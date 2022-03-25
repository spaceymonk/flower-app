import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { addEdge, updateEdge } from 'react-flow-renderer';
import createEdge from '../../services/createEdge';

const useEdgeService = () => {
  const { setEdges, getEdges } = React.useContext(AppContext);

  const onConnect = React.useCallback(
    (connection) => {
      if (connection.source === connection.target) {
        return;
      }
      return setEdges((eds) => {
        const duplicateEdge = eds.find(
          (e) => e.source === connection.source && connection.sourceHandle === e.sourceHandle
        );
        if (duplicateEdge) {
          return eds;
        } else {
          const edge = createEdge(connection);
          return addEdge(edge, eds);
        }
      });
    },
    [setEdges]
  );

  const onEdgeUpdate = React.useCallback(
    (oldEdge, newConnection) => {
      if (newConnection.source === newConnection.target) {
        return;
      }
      setEdges((els) => {
        for (const e of els) {
          if (
            e.source === newConnection.source &&
            e.sourceHandle === newConnection.sourceHandle &&
            e.target === newConnection.target &&
            e.targetHandle === newConnection.targetHandle
          ) {
            return;
          }
        }
        updateEdge(oldEdge, newConnection, els);
      });
    },
    [setEdges]
  );

  const getConnectedEdges = React.useCallback(
    (nodeId) => {
      const edges = getEdges();
      return edges.filter((e) => e.source === nodeId || e.target === nodeId);
    },
    [getEdges]
  );

  return {
    onConnect,
    onEdgeUpdate,
    getConnectedEdges,
  };
};

export default useEdgeService;
