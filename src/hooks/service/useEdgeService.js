import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { addEdge } from 'react-flow-renderer';
import createEdge from '../../services/createEdge';

const useEdgeService = () => {
  const { setEdges, getEdges } = React.useContext(AppContext);

  const onConnect = React.useCallback(
    (connection) => {
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

  const getConnectedEdges = React.useCallback((nodeId) => {
    const edges = getEdges();
    return edges.filter((e) => e.source === nodeId || e.target === nodeId);
  }, [getEdges]);

  return {
    onConnect,
    getConnectedEdges
  };
};

export default useEdgeService;
