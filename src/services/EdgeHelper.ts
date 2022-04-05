import { addEdge, Connection, Edge, MarkerType, updateEdge } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import { throwErrorIfNull, throwErrorIfUndefined } from '../util';
import * as BlockHelper from './BlockHelper';
import { Block } from '../types';
import { SetEdges } from './common';

/* -------------------------------------------------------------------------- */
/*                                  findById                                  */
/* -------------------------------------------------------------------------- */
export const findById = (edgeList: Edge<any>[], id: string): Edge<any> | undefined => {
  return edgeList.find((edge) => edge.id === id);
};

/* -------------------------------------------------------------------------- */
/*                                findAllByPair                               */
/* -------------------------------------------------------------------------- */
export const findAllByPair = (edgeList: Edge<any>[], source: string, target: string): Edge<any>[] | undefined => {
  return edgeList.filter((edge) => edge.source === source && edge.target === target);
};

/* -------------------------------------------------------------------------- */
/*                              getOutgoingEdges                              */
/* -------------------------------------------------------------------------- */
export const getOutgoingEdges = (block: Block, edgeList: Edge<any>[]): Edge<any>[] => {
  return throwErrorIfUndefined(edgeList.filter((edge) => edge.source === block.id));
};

/* -------------------------------------------------------------------------- */
/*                              getIncomingEdges                              */
/* -------------------------------------------------------------------------- */
export const getIncomingEdges = (block: Block, edgeList: Edge<any>[]): Edge<any>[] => {
  return throwErrorIfUndefined(edgeList.filter((edge) => edge.target === block.id));
};

/* -------------------------------------------------------------------------- */
/*                                includesEdge                                */
/* -------------------------------------------------------------------------- */
export const includesEdge = (edgeList: Edge[], edge: Edge): boolean => {
  for (let i = 0; i < edgeList.length; i++) {
    if (edgeList[i].id === edge.id) {
      return true;
    }
  }
  return false;
};

/* -------------------------------------------------------------------------- */
/*                                 createEdge                                 */
/* -------------------------------------------------------------------------- */
export const createEdge = (connection: Connection): Edge => {
  return {
    id: uuid(),
    source: throwErrorIfNull(connection.source),
    target: throwErrorIfNull(connection.target),
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle,
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#505050' },
  };
};

/* -------------------------------------------------------------------------- */
/*                              isValidConnection                             */
/* -------------------------------------------------------------------------- */
export const isValidConnection = (connection: Connection, blockList: Block[]): boolean => {
  if (connection.source === connection.target) {
    return false;
  }

  const source = throwErrorIfUndefined(BlockHelper.findById(blockList, throwErrorIfNull(connection.source)));
  const target = throwErrorIfUndefined(BlockHelper.findById(blockList, throwErrorIfNull(connection.target)));

  if (
    (connection.targetHandle === 'inner-target' && source.parentNode !== connection.target) ||
    (connection.targetHandle === 'outer-target' && source.parentNode === connection.target) ||
    (connection.sourceHandle === 'inner-source' && target.parentNode !== connection.source) ||
    (connection.sourceHandle === 'outer-source' && target.parentNode === connection.source)
  ) {
    return false;
  }

  return true;
};

/* -------------------------------------------------------------------------- */
/*                              isValidOnConnect                              */
/* -------------------------------------------------------------------------- */
export const isValidOnConnect = (connection: Connection, edgeList: Edge[]): boolean => {
  for (const e of edgeList) {
    // there can be only one edge with same source data between two nodes
    if (e.source === connection.source && connection.sourceHandle === e.sourceHandle) {
      return false;
    }
  }
  return true;
};

/* -------------------------------------------------------------------------- */
/*                             isValidOnEdgeUpdate                            */
/* -------------------------------------------------------------------------- */
export const isValidOnEdgeUpdate = (oldEdge: Edge, connection: Connection, edgeList: Edge[]): boolean => {
  for (const e of edgeList) {
    // if there is already an edge return
    if (e.source === connection.source && e.sourceHandle === connection.sourceHandle && oldEdge.id !== e.id) {
      return false;
    }
    // if there is already an exact edge return
    if (
      e.source === connection.source &&
      e.sourceHandle === connection.sourceHandle &&
      e.target === connection.target &&
      e.targetHandle === connection.targetHandle
    ) {
      return false;
    }
  }
  return true;
};

/* -------------------------------------------------------------------------- */
/*                                  onConnect                                 */
/* -------------------------------------------------------------------------- */
export const onConnect = (connection: Connection, blockList: Block[], edgeList: Edge[], setEdges: SetEdges) => {
  if (isValidConnection(connection, blockList) && isValidOnConnect(connection, edgeList)) {
    const edge = createEdge(connection);
    setEdges((eds) => addEdge(edge, eds));
  }
};

/* -------------------------------------------------------------------------- */
/*                                onEdgeUpdate                                */
/* -------------------------------------------------------------------------- */
export const onEdgeUpdate = (connection: Connection, blockList: Block[], edgeList: Edge[], oldEdge: Edge, setEdges: SetEdges) => {
  if (isValidConnection(connection, blockList) && isValidOnEdgeUpdate(oldEdge, connection, edgeList)) {
    setEdges((eds) => updateEdge(oldEdge, connection, eds));
  }
};

/* -------------------------------------------------------------------------- */
/*                                 removeEdges                                */
/* -------------------------------------------------------------------------- */
export const removeEdges = (edgeList: Edge[], setEdges: SetEdges) => {
  setEdges((eds) => eds.filter((e) => !includesEdge(edgeList, e)));
};
