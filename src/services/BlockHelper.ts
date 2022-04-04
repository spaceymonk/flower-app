import { Edge, getConnectedEdges, SetCenter, XYPosition } from 'react-flow-renderer';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { BlockTypes, Block, BlockData, GlowTypes } from '../types';
import { PositionGenerator, SetBlocks } from './common';

/* -------------------------------------------------------------------------- */
/*                                 createBlock                                */
/* -------------------------------------------------------------------------- */
export const createBlock = (type: BlockTypes, pos: XYPosition): Block => {
  return {
    id: uuid(),
    type: type,
    position: pos,
    data: { text: undefined, glow: undefined, name: undefined },
    parentNode: undefined,
  };
};

/* -------------------------------------------------------------------------- */
/*                               updateBlockData                              */
/* -------------------------------------------------------------------------- */
export const updateBlockData = (id: string, changeData: BlockData, setBlocks: SetBlocks): void => {
  setBlocks((blocks) =>
    blocks.map((b) => {
      if (b.id === id) {
        b.data = {
          ...b.data,
          ...changeData,
        };
      }
      return b;
    })
  );
};

/* -------------------------------------------------------------------------- */
/*                                 removeBlock                                */
/* -------------------------------------------------------------------------- */
export const removeBlock = (block: Block, setBlocks: SetBlocks): void => {
  setBlocks((blocks) => {
    const newBlocks: Block[] = [];
    blocks.forEach((b) => {
      if (b.id !== block.id) {
        if (b.parentNode === block.id) {
          b.parentNode = undefined;
          b.extent = undefined;
          b.position = { x: b.position.x + block.position.x, y: b.position.y + block.position.y };
        }
        newBlocks.push(b);
      }
    });
    return newBlocks;
  });
};

/* -------------------------------------------------------------------------- */
/*                               highlightBlocks                              */
/* -------------------------------------------------------------------------- */
export const highlightBlocks = (ids: string[] | null, glowType: GlowTypes = GlowTypes.NONE, setBlocks: SetBlocks): void => {
  setBlocks((blocks) =>
    blocks.map((b) => {
      if (ids === null) {
        updateBlockData(b.id, { glow: GlowTypes.NONE }, setBlocks);
      } else if (ids.includes(b.id)) {
        updateBlockData(b.id, { glow: glowType }, setBlocks);
      } else {
        updateBlockData(b.id, { glow: GlowTypes.NONE }, setBlocks);
      }
      return b;
    })
  );
};

/* -------------------------------------------------------------------------- */
/*                                 focusBlock                                 */
/* -------------------------------------------------------------------------- */
export const focusBlock = (block: Block, setCenter: SetCenter) => {
  const x = block.position.x; //+ node.width / 2;
  const y = block.position.y; //+ node.height / 2;
  const zoom = 1.85;
  setCenter(x, y, { zoom, duration: 1000 });
};

/* -------------------------------------------------------------------------- */
/*                            findDirectChildBlocks                           */
/* -------------------------------------------------------------------------- */
export const findDirectChildBlocks = (blockId: string, blockList: Block[]): Block[] => {
  const childBlocks = blockList.filter((b) => b.parentNode === blockId);
  return childBlocks;
};
/* -------------------------------------------------------------------------- */
/*                         checkRecursiveParentPresent                        */
/* -------------------------------------------------------------------------- */
const checkRecursiveParentPresent = (blockList: Block[], parentBlock: Block, children: Block[]): boolean => {
  let parentBlockIter = findParentBlock(blockList, parentBlock);
  while (parentBlockIter) {
    for (const child of children) {
      if (child.id === parentBlockIter.id) {
        return true;
      }
    }
    parentBlockIter = findParentBlock(blockList, parentBlockIter);
  }
  return false;
};

/* -------------------------------------------------------------------------- */
/*                              updateBlockParent                             */
/* -------------------------------------------------------------------------- */
export const updateBlockParent = (
  parentBlock: Block,
  children: Block[],
  blockList: Block[],
  edgeList: Edge[],
  setBlocks: SetBlocks,
  removeEdges: (edgeList: Edge[]) => void
): void => {
  if (checkRecursiveParentPresent(blockList, parentBlock, children)) {
    toast.error('Cannot add parent block as child');
    return;
  }
  const positionGen = new PositionGenerator({ x: 0, y: 0 }, 15);

  setBlocks((blocks) => {
    const remainingBlocks = blocks.filter((b) => !includesBlock(children, b));
    const updatedChildren = children.map((b) => {
      // if block is not already a child of parent
      if (b.parentNode !== parentBlock.id) {
        const childEdges = getConnectedEdges([b], edgeList);
        removeEdges(childEdges);
        b.parentNode = parentBlock.id;
        b.extent = 'parent';
        b.position = positionGen.nextPosition();
      }
      return b;
    });
    return [...remainingBlocks, ...updatedChildren];
  });
};

/* -------------------------------------------------------------------------- */
/*                              removeBlockParent                             */
/* -------------------------------------------------------------------------- */
export const removeBlockParent = (
  parentBlock: Block,
  children: Block[],
  edgeList: Edge[],
  setBlocks: SetBlocks,
  removeEdges: (edgeList: Edge[]) => void
) => {
  const positionGen = new PositionGenerator({ x: parentBlock.position.x, y: parentBlock.position.y }, -15);

  setBlocks((blocks) => {
    const remainingBlocks = blocks.filter((b) => !includesBlock(children, b));
    const updatedChildren = children.map((b) => {
      b.parentNode = undefined;
      b.extent = undefined;
      b.position = positionGen.nextPosition();
      return b;
    });
    const childrenEdges = getConnectedEdges(children, edgeList);
    removeEdges(childrenEdges);
    return [...remainingBlocks, ...updatedChildren];
  });
};

/* -------------------------------------------------------------------------- */
/*                                includesBlock                               */
/* -------------------------------------------------------------------------- */
export const includesBlock = (blockList: Block[], block: Block): boolean => {
  for (let i = 0; i < blockList.length; i++) {
    if (blockList[i].id === block.id) {
      return true;
    }
  }
  return false;
};

/* -------------------------------------------------------------------------- */
/*                               findParentBlock                              */
/* -------------------------------------------------------------------------- */
export const findParentBlock = (blockList: Block[], block: Block): Block | undefined => {
  for (let i = 0; i < blockList.length; i++) {
    if (blockList[i].id === block.parentNode) {
      return blockList[i];
    }
  }
  return undefined;
};

/* -------------------------------------------------------------------------- */
/*                          findAllAvailableChildren                          */
/* -------------------------------------------------------------------------- */
export const findAllAvailableChildren = (blockList: Block[], block: Block, childNodes: Block[]): Block[] => {
  let availableChildren: Block[] = [];
  for (const b of blockList) {
    if (!(b.id === block.id || b.type === BlockTypes.START_BLOCK || b.type === BlockTypes.STOP_BLOCK || includesBlock(childNodes, b))) {
      availableChildren.push(b);
    }
  }
  return availableChildren;
};

/* -------------------------------------------------------------------------- */
/*                                  findById                                  */
/* -------------------------------------------------------------------------- */
export const findById = (blockList: Block[], id: string): Block | undefined => {
  for (let i = 0; i < blockList.length; i++) {
    if (blockList[i].id === id) {
      return blockList[i];
    }
  }
  return undefined;
};
