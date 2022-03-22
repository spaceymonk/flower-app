import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import MultipleStartError from '../../exceptions/MultipleStartError';
import MultipleStopError from '../../exceptions/MultipleStopError';
import NoStartError from '../../exceptions/NoStartError';
import NoStopError from '../../exceptions/NoStopError';
import NotConnectedError from '../../exceptions/NotConnectedError';
import { SimulationContext } from '../../providers/SimulationProvider';
import useBlockService, { GlowTypes } from './useBlockService';

const useParser = () => {
  const { getEdges, getNodes } = useReactFlow();
  const { setVariableTable, currentBlockRef } = React.useContext(SimulationContext);
  const { highlightNode } = useBlockService();

  const updateCurrentBlock = React.useCallback(
    (nextBlock) => {
      currentBlockRef.current = nextBlock;
      highlightNode(currentBlockRef.current, GlowTypes.NORMAL);
      console.log('[parser] block to process: ', currentBlockRef.current);
    },
    [currentBlockRef, highlightNode]
  );

  const next = React.useCallback(
    (handleId) => {
      const edge = getEdges().find((e) => e.source === currentBlockRef.current.id);
      let node;
      if (handleId) node = getNodes().find((n) => edge.handleId === handleId && n.id === edge.target);
      else node = getNodes().find((n) => n.id === edge.target);
      return node;
    },
    [currentBlockRef, getEdges, getNodes]
  );

  const hasNext = React.useCallback(() => {
    for (let i = 0; i < getEdges().length; ++i) {
      const e = getEdges()[i];
      if (e.source === currentBlockRef.current.id) return true;
    }
    return false;
  }, [currentBlockRef, getEdges]);

  const validate = React.useCallback(() => {
    let startBlockCount = 0;
    let stopBlockCount = 0;

    for (let i = 0; i < getNodes().length; i++) {
      const n = getNodes()[i];
      if (n.type === 'start') {
        startBlockCount += 1;
        if (startBlockCount > 1) throw new MultipleStartError();
        updateCurrentBlock(n);
      }
      if (n.type === 'stop') {
        stopBlockCount += 1;
        if (stopBlockCount > 1) throw new MultipleStopError();
      }

      if (n.handleBounds.source) {
        const x = getEdges().find((e) => e.source === n.id);
        if (!x || n.handleBounds.source.length === x.length) throw new NotConnectedError(n.id);
      }

      if (n.handleBounds.target) {
        const x = getEdges().find((e) => e.target === n.id);
        if (!x || n.handleBounds.target.length === x.length) throw new NotConnectedError(n.id);
      }
    }

    if (startBlockCount === 0) throw new NoStartError();
    if (stopBlockCount === 0) throw new NoStopError();
  }, [getNodes, updateCurrentBlock, getEdges]);

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

export default useParser;
