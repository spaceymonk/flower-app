import React from 'react';
import MultipleStartError from '../../exceptions/MultipleStartError';
import MultipleStopError from '../../exceptions/MultipleStopError';
import NoStartError from '../../exceptions/NoStartError';
import NoStopError from '../../exceptions/NoStopError';
import NotConnectedError from '../../exceptions/NotConnectedError';
import useBlockService from './useBlockService';
import { useAppContext } from '../../providers/AppProvider';
import { useSimulationContext } from '../../providers/SimulationProvider';
import { Block, BlockTypes, GlowTypes } from '../../types';
import { throwErrorIfUndefined } from '../../services/common';
import { getConnectedEdges } from 'react-flow-renderer';

const useFlowParser = () => {
  const { getEdges, getBlocks } = useAppContext();
  const { currentBlockRef } = useSimulationContext();
  const { highlightBlocks } = useBlockService();

  const updateCurrentBlock = React.useCallback(
    (nextBlock) => {
      currentBlockRef.current = nextBlock;
      highlightBlocks(currentBlockRef.current.id, GlowTypes.NORMAL);
      console.log('[parser] block to process: ', currentBlockRef.current);
    },
    [currentBlockRef, highlightBlocks]
  );

  const next = React.useCallback(
    (handleId: string | null) => {
      const nodes = getBlocks();
      const edges = getEdges();
      const edge = throwErrorIfUndefined(edges.find((e) => e.source === currentBlockRef.current.id));
      let block: Block;
      if (handleId) block = throwErrorIfUndefined(nodes.find((n) => edge.handleId === handleId && n.id === edge.target));
      else block = throwErrorIfUndefined(nodes.find((n) => n.id === edge.target));
      return block;
    },
    [currentBlockRef, getBlocks, getEdges]
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
    let startBlocks = [];
    let stopBlocks = [];
    const nodes = getBlocks();
    const edges = getEdges();

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const connectedEdgeCount = getConnectedEdges([n], edges).length;
      if (n.type === BlockTypes.START_BLOCK) {
        startBlocks.push(n);
        if (startBlocks.length > 1) throw new MultipleStartError(startBlocks.map((b) => b.id));
        if (connectedEdgeCount < 1) throw new NotConnectedError(n.id);
      } else if (n.type === BlockTypes.STOP_BLOCK) {
        stopBlocks.push(n);
        if (startBlocks.length > 1) throw new MultipleStopError(stopBlocks.map((b) => b.id));
        if (connectedEdgeCount < 1) throw new NotConnectedError(n.id);
      } else if (n.type === BlockTypes.DECISION_BLOCK) {
        if (connectedEdgeCount < 3) throw new NotConnectedError(n.id);
      } else if (connectedEdgeCount < 2) {
        throw new NotConnectedError(n.id);
      }
    }
    if (startBlocks.length === 0) throw new NoStartError();
    if (stopBlocks.length === 0) throw new NoStopError();

    updateCurrentBlock(startBlocks[0]);
  }, [getBlocks, getEdges, updateCurrentBlock]);

  const parse = React.useCallback(() => {
    console.log('[parser] processing: ', currentBlockRef.current);
    //todo
    const nextBlock = next(null);
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
