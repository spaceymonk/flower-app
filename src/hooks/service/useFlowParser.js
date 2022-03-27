import React from 'react';
import MultipleStartError from '../../exceptions/MultipleStartError';
import MultipleStopError from '../../exceptions/MultipleStopError';
import NoStartError from '../../exceptions/NoStartError';
import NoStopError from '../../exceptions/NoStopError';
import NotConnectedError from '../../exceptions/NotConnectedError';
import { AppContext } from '../../providers/AppProvider';
import { SimulationContext } from '../../providers/SimulationProvider';
import useBlockService, { GlowTypes } from './useBlockService';
import useEdgeService from './useEdgeService';
import { BlockTypes } from '../../services/createNode';

const useFlowParser = () => {
  const { getEdges, getNodes } = React.useContext(AppContext);
  const { currentBlockRef } = React.useContext(SimulationContext);
  const { highlightNode } = useBlockService();
  const { getConnectedEdges } = useEdgeService();

  const updateCurrentBlock = React.useCallback(
    (nextBlock) => {
      currentBlockRef.current = nextBlock;
      highlightNode(currentBlockRef.current.id, GlowTypes.NORMAL);
      console.log('[parser] block to process: ', currentBlockRef.current);
    },
    [currentBlockRef, highlightNode]
  );

  const next = React.useCallback(
    (handleId) => {
      const nodes = getNodes();
      const edges = getEdges();
      const edge = edges.find((e) => e.source === currentBlockRef.current.id);
      let node;
      if (handleId) node = nodes.find((n) => edge.handleId === handleId && n.id === edge.target);
      else node = nodes.find((n) => n.id === edge.target);
      return node;
    },
    [currentBlockRef, getEdges, getNodes]
  );

  const hasNext = React.useCallback(() => {
    const edges = getEdges();
    for (let i = 0; i < edges.length; ++i) {
      const e = edges[i];
      if (e.source === currentBlockRef.current.id) return true;
    }
    return false;
  }, [currentBlockRef, getEdges]);

  const validate = React.useCallback(() => {
    let startBlockCount = 0;
    let stopBlockCount = 0;
    const nodes = getNodes();
    let startBlock = null;

    for (let i = 0; i < getNodes().length; i++) {
      const n = nodes[i];
      const connectedEdgeCount = getConnectedEdges(n.id).length;
      if (n.type === BlockTypes.START_BLOCK) {
        startBlockCount += 1;
        if (startBlockCount > 1) throw new MultipleStartError([startBlock.id, n.id]);
        startBlock = n;
        if (connectedEdgeCount < 1) throw new NotConnectedError(n.id);
      } else if (n.type === BlockTypes.STOP_BLOCK) {
        stopBlockCount += 1;
        if (stopBlockCount > 1) throw new MultipleStopError();
        if (connectedEdgeCount < 1) throw new NotConnectedError(n.id);
      } else if (n.type === BlockTypes.DECISION_BLOCK) {
        if (connectedEdgeCount < 3) throw new NotConnectedError(n.id);
      } else if (connectedEdgeCount < 2) {
        throw new NotConnectedError(n.id);
      }
    }
    if (startBlockCount === 0) throw new NoStartError();
    if (stopBlockCount === 0) throw new NoStopError();

    if (startBlock) updateCurrentBlock(startBlock);
  }, [getNodes, updateCurrentBlock, getConnectedEdges]);

  const parse = React.useCallback(() => {
    console.log('[parser] processing: ', currentBlockRef.current);
    //todo
    const nextBlock = next();
    updateCurrentBlock(nextBlock);
  }, [currentBlockRef, next, updateCurrentBlock]);

  return {
    validate,
    next,
    hasNext,
    parse,
  };
};

export default useFlowParser;
