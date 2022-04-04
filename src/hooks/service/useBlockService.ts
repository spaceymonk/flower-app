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
  findAllAvailableChildren,
  findById,
} from '../../services/BlockHelper';
import useEdgeService from './useEdgeService';
import { Block, BlockData, GlowTypes } from '../../types';

const useBlockService = () => {
  const { setBlocks, getBlocks, getEdges } = useAppContext();
  const { removeEdges } = useEdgeService();
  const { addNodes, setCenter } = useReactFlow();

  return {
    addBlock: addNodes,
    findById: React.useCallback(
      (id: string) => {
        return findById(getBlocks(), id);
      },
      [getBlocks]
    ),
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
        updateBlockParent(parentBlock, children, getBlocks(), getEdges(), setBlocks, removeEdges);
      },
      [getBlocks, getEdges, setBlocks, removeEdges]
    ),
    removeBlockParent: React.useCallback(
      (parentBlock: Block, children: Block[]) => {
        removeBlockParent(parentBlock, children, getEdges(), setBlocks, removeEdges);
      },
      [getEdges, removeEdges, setBlocks]
    ),
    findAllAvailableChildren: React.useCallback(
      (block: Block, childNodes: Block[]) => {
        return findAllAvailableChildren(getBlocks(), block, childNodes);
      },
      [getBlocks]
    ),
  };
};

export default useBlockService;
