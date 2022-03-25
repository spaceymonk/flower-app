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
        for (const e of eds) {
          if (e.source === connection.source && connection.sourceHandle === e.sourceHandle) {
            return eds;
          }
        }
        const edge = createEdge(connection);
        return addEdge(edge, eds);
      });
    },
    [setEdges]
  );

  const onEdgeUpdate = (oldEdge, newConnection) => {
    // check for self connection
    if (newConnection.source === newConnection.target) {
      return;
    }

    return setEdges((eds) => {
      // check for same edge
      for (const e of eds) {
        if (e.source === newConnection.source && e.sourceHandle === newConnection.sourceHandle && oldEdge.id !== e.id) {
          return eds;
        }
        if (
          e.source === newConnection.source &&
          e.sourceHandle === newConnection.sourceHandle &&
          e.target === newConnection.target &&
          e.targetHandle === newConnection.targetHandle
        ) {
          return eds;
        }
      }

      return updateEdge(oldEdge, newConnection, eds);
    });
  };

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
