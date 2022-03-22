import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import { applyEdgeChanges } from 'react-flow-renderer';
import createEdge from '../../services/createEdge';

const useEdgeService = () => {
  const { setEdges } = React.useContext(AppContext);

  const onEdgesChange = React.useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = React.useCallback(
    (connection) => {
      setEdges((eds) => {
        const duplicateEdge = eds.find(
          (e) => e.source === connection.source && connection.sourceHandle === e.sourceHandle
        );
        if (duplicateEdge) {
          return eds;
        } else {
          const edge = createEdge(connection);
          return [...eds, edge];
        }
      });
    },
    [setEdges]
  );

  return {
    onEdgesChange,
    onConnect,
  };
};

export default useEdgeService;
