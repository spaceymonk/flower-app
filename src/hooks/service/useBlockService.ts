import React from 'react';
import { useAppContext } from '../../providers/AppProvider';
import { useReactFlow } from 'react-flow-renderer';
import {
  highlightBlocks,
  removeBlock,
  updateBlockData,
  focusBlock,
  findDirectChildBlocks,
  updateBlockParent,
  removeBlockParent,
} from '../../services/BlockHelper';
import useEdgeService from './useEdgeService';
import { Block, BlockData, GlowTypes } from '../../types';

const useBlockService = () => {
  const { setBlocks, getBlocks } = useAppContext();
  const { getConnectedEdges, removeEdge } = useEdgeService();
  const { addNodes, setCenter } = useReactFlow();

  return {
    addNode: addNodes,
    updateBlockData: React.useCallback(
      (id: string, changeData: BlockData) => {
        updateBlockData(id, changeData, setBlocks);
      },
      [setBlocks]
    ),
    removeBlock: React.useCallback(
      (block: Block) => {
        removeBlock(block, setBlocks);
      },
      [setBlocks]
    ),
    highlightBlocks: React.useCallback(
      (ids: string[] | string | null, glowType: GlowTypes = GlowTypes.NONE) => {
        highlightBlocks(ids, glowType, setBlocks);
      },
      [setBlocks]
    ),
    focusBlock: React.useCallback(
      (block: Block) => {
        focusBlock(block, setCenter);
      },
      [setCenter]
    ),
    findDirectChildBlocks: React.useCallback(
      (blockId: string) => {
        return findDirectChildBlocks(blockId, getBlocks());
      },
      [getBlocks]
    ),
    updateBlockParent: React.useCallback(
      (parentBlock: Block, children: Block[]) => {
        updateBlockParent(parentBlock, children, getBlocks(), setBlocks, removeEdge, getConnectedEdges);
      },
      [getBlocks, setBlocks, removeEdge, getConnectedEdges]
    ),
    removeBlockParent: React.useCallback(
      (parentBlock: Block, children: Block[]) => {
        removeBlockParent(parentBlock, children, setBlocks, removeEdge, getConnectedEdges);
      },
      [getConnectedEdges, removeEdge, setBlocks]
    ),
  };
};

export default useBlockService;
