import React from 'react';
import { Connection, Edge } from 'react-flow-renderer';
import { findById, onConnect, onEdgeUpdate, removeEdges } from '../services/EdgeHelper';
import { useAppContext } from '../providers/AppProvider';

const useEdgeHelper = () => {
  const { setEdges, getEdges, getBlocks } = useAppContext();

  return {
    findById: React.useCallback(
      (id: string) => {
        return findById(getEdges(), id);
      },
      [getEdges]
    ),
    onConnect: React.useCallback(
      (connection: Connection) => {
        onConnect(connection, getBlocks(), getEdges(), setEdges);
      },
      [getBlocks, getEdges, setEdges]
    ),
    onEdgeUpdate: React.useCallback(
      (oldEdge: Edge, connection: Connection) => {
        onEdgeUpdate(connection, getBlocks(), getEdges(), oldEdge, setEdges);
      },
      [getBlocks, getEdges, setEdges]
    ),
    removeEdges: React.useCallback(
      (edgeList: Edge[]) => {
        removeEdges(edgeList, setEdges);
      },
      [setEdges]
    ),
  };
};

export default useEdgeHelper;
