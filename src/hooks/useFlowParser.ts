import React from 'react';
import useBlockHelper from './useBlockHelper';
import { useAppContext } from '../providers/AppProvider';
import { useSimulationContext } from '../providers/SimulationProvider';
import { Block, GlowTypes } from '../types';
import { throwErrorIfUndefined } from '../util';
import { validateFlow } from '../services/FlowParser';

const useFlowParser = () => {
  const { getEdges, getBlocks } = useAppContext();
  const { currentBlockRef } = useSimulationContext();
  const { highlightBlocks } = useBlockHelper();

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
      if (handleId) block = throwErrorIfUndefined(nodes.find((n) => edge.targetHandle === handleId && n.id === edge.target));
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

  const initialize = React.useCallback(() => {
    const nodes = getBlocks();
    const edges = getEdges();
    const startBlock = validateFlow(nodes, edges);
    updateCurrentBlock(startBlock);
  }, [getBlocks, getEdges, updateCurrentBlock]);

  const process = React.useCallback(() => {
    console.log('[parser] processing: ', currentBlockRef.current);
    //todo
    const nextBlock = next(null);
    updateCurrentBlock(nextBlock);
  }, [currentBlockRef, next, updateCurrentBlock]);

  return {
    initialize,
    next,
    hasNext,
    process,
  };
};

export default useFlowParser;
