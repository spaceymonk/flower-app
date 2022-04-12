import React from 'react';
import { useAppContext } from '../providers/AppProvider';
import { useReactFlow } from 'react-flow-renderer';
import * as blockService from '../services/BlockHelper';
import useEdgeHelper from './useEdgeHelper';
import { Block, BlockData, GlowTypes } from '../types';

const useBlockHelper = () => {
  const { setBlocks, getBlocks, getEdges } = useAppContext();
  const { removeEdges } = useEdgeHelper();
  const { addNodes, setCenter } = useReactFlow();

  return {
    addBlock: addNodes,
    findById: React.useCallback(
      (id: string) => {
        return blockService.findById(getBlocks(), id);
      },
      [getBlocks]
    ),
    updateBlockData: React.useCallback(
      (id: string, changeData: BlockData) => {
        blockService.updateBlockData(id, changeData, setBlocks);
      },
      [setBlocks]
    ),
    removeBlock: React.useCallback(
      (block: Block) => {
        blockService.removeBlock(block, setBlocks);
      },
      [setBlocks]
    ),
    highlightBlocks: React.useCallback(
      (ids: string[] | null, glowType: GlowTypes = GlowTypes.NONE) => {
        blockService.highlightBlocks(ids, glowType, setBlocks);
      },
      [setBlocks]
    ),
    focusBlock: React.useCallback(
      (block: Block) => {
        blockService.focusBlock(block, setCenter);
      },
      [setCenter]
    ),
    findDirectChildBlocks: React.useCallback(
      (blockId: string) => {
        return blockService.findDirectChildBlocks(blockId, getBlocks());
      },
      [getBlocks]
    ),
    updateBlockParent: React.useCallback(
      (parentBlock: Block, children: Block[]) => {
        blockService.updateBlockParent(parentBlock, children, getBlocks(), getEdges(), setBlocks, removeEdges);
      },
      [getBlocks, getEdges, setBlocks, removeEdges]
    ),
    removeBlockParent: React.useCallback(
      (parentBlock: Block, children: Block[]) => {
        blockService.removeBlockParent(parentBlock, children, getBlocks(), getEdges(), setBlocks, removeEdges);
      },
      [getBlocks, getEdges, removeEdges, setBlocks]
    ),
    findAllAvailableChildren: React.useCallback(
      (block: Block, childNodes: Block[]) => {
        return blockService.findAllAvailableChildren(getBlocks(), block, childNodes);
      },
      [getBlocks]
    ),
  };
};

export default useBlockHelper;
