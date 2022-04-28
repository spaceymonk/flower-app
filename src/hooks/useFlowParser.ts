import React from 'react';
import useBlockHelper from './useBlockHelper';
import { useAppContext } from '../providers/AppProvider';
import { useSimulationContext } from '../providers/SimulationProvider';
import { Block, BlockTypes, ContainerBlockHandle, DecisionBlockHandle, GlowTypes } from '../types';
import { throwErrorIfNull, throwErrorIfUndefined } from '../util';
import { validateFlow } from '../services/FlowParser';
import { evalBranchingBlock, evalLoadBlock, evalStatementBlock, evalStoreBlock } from '../services/SimulationHelper';

const useFlowParser = () => {
  const { getEdges, getBlocks, getInputParams } = useAppContext();
  const { currentBlockRef, variableTableRef, inputParamCursor } = useSimulationContext();
  const { highlightBlocks } = useBlockHelper();

  const updateCurrentBlock = React.useCallback(
    (nextBlock: Block) => {
      currentBlockRef.current = nextBlock;
      highlightBlocks([currentBlockRef.current.id], GlowTypes.NORMAL);
    },
    [currentBlockRef, highlightBlocks]
  );

  const next = React.useCallback(
    (handleId: string | null) => {
      const nodes = getBlocks();
      const edges = getEdges();
      const edge = throwErrorIfUndefined(edges.find((e) => e.sourceHandle === handleId && e.source === currentBlockRef.current?.id));
      const block = throwErrorIfUndefined(nodes.find((n) => n.id === edge.target));
      return block;
    },
    [currentBlockRef, getBlocks, getEdges]
  );

  const hasNext = React.useCallback(() => {
    if (currentBlockRef.current === null) return false;
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
    const [startBlock] = validateFlow(nodes, edges);
    updateCurrentBlock(startBlock);
    inputParamCursor.current = 0;
    variableTableRef.current = {};
  }, [getBlocks, getEdges, inputParamCursor, updateCurrentBlock, variableTableRef]);

  const process = React.useCallback(() => {
    const block = throwErrorIfNull(currentBlockRef.current);

    let nextBlock = null;
    if (block.type === BlockTypes.STATEMENT_BLOCK) {
      evalStatementBlock(block, variableTableRef);
    } else if (block.type === BlockTypes.STORE_BLOCK) {
      evalStoreBlock(block, variableTableRef);
    } else if (block.type === BlockTypes.DECISION_BLOCK) {
      const branch = evalBranchingBlock(block, variableTableRef);
      nextBlock = next(branch === true ? DecisionBlockHandle.TRUE : DecisionBlockHandle.FALSE);
    } else if (block.type === BlockTypes.WHILE_LOOP_BLOCK) {
      const branch = evalBranchingBlock(block, variableTableRef);
      nextBlock = next(branch === true ? ContainerBlockHandle.INNER_SOURCE : ContainerBlockHandle.OUTER_SOURCE);
    } else if (block.type === BlockTypes.LOAD_BLOCK) {
      evalLoadBlock(block, getInputParams(), inputParamCursor, variableTableRef);
    }
    if (!nextBlock) {
      nextBlock = next(null);
    }

    updateCurrentBlock(throwErrorIfNull(nextBlock));
  }, [currentBlockRef, updateCurrentBlock, variableTableRef, next, getInputParams, inputParamCursor]);

  return {
    initialize,
    next,
    hasNext,
    process,
  };
};

export default useFlowParser;
