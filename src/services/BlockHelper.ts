import { Edge, getConnectedEdges, SetCenter, XYPosition } from 'react-flow-renderer';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { BlockTypes, Block, BlockData, GlowTypes, ContainerBlockHandle } from '../types';
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
export const focusBlock = (block: Block, blockList: Block[], setCenter: SetCenter) => {
  const w = block.width || 0;
  const h = block.height || 0;
  let x = block.position.x + w / 2;
  let y = block.position.y + h / 2;
  let parentBlockId = block.parentNode;
  while (parentBlockId) {
    const parentBlock = findById(blockList, parentBlockId);
    if (parentBlock) {
      x += parentBlock.position.x;
      y += parentBlock.position.y;
      parentBlockId = parentBlock.parentNode;
    }
  }
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

/* --------------------------- normalizeBlockOrder -------------------------- */
function normalizeBlockOrder(block: Block, blockList: Block[], result: Block[] = []): Block[] {
  result.push(block);
  const children = findDirectChildBlocks(block.id, blockList);
  children.forEach((child) => normalizeBlockOrder(child, blockList, result));
  return result;
}

/* ---------------------------- removeChildEdges ---------------------------- */
function removeChildEdges(b: Block, edgeList: Edge[], removeEdges: (edgeList: Edge[]) => void): void {
  const childEdges = getConnectedEdges([b], edgeList).filter((e) => {
    if (
      (e.source === b.id && e.sourceHandle === ContainerBlockHandle.INNER_SOURCE) ||
      (e.target === b.id && e.targetHandle === ContainerBlockHandle.INNER_TARGET)
    ) {
      return false;
    }
    return true;
  });
  removeEdges(childEdges);
}

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
    const affectedBlocks: Block[] = [];
    children.forEach((b) => {
      // if block is not already a child of the parent
      if (b.parentNode !== parentBlock.id) {
        b.parentNode = parentBlock.id;
        b.extent = 'parent';
        b.position = positionGen.nextPosition();
        removeChildEdges(b, edgeList, removeEdges);
        affectedBlocks.push(...normalizeBlockOrder(b, blockList));
      }
    });
    const remainingBlocks = blocks.filter((b) => !includesBlock(affectedBlocks, b));

    return [...remainingBlocks, ...affectedBlocks];
  });
};

/* -------------------------------------------------------------------------- */
/*                              removeBlockParent                             */
/* -------------------------------------------------------------------------- */
export const removeBlockParent = (
  parentBlock: Block,
  children: Block[],
  blockList: Block[],
  edgeList: Edge[],
  setBlocks: SetBlocks,
  removeEdges: (edgeList: Edge[]) => void
) => {
  const positionGen = new PositionGenerator({ x: parentBlock.position.x, y: parentBlock.position.y }, -15);

  setBlocks((blocks) => {
    const affectedBlocks: Block[] = [];
    children.forEach((b) => {
      b.parentNode = undefined;
      b.extent = undefined;
      b.position = positionGen.nextPosition();
      removeChildEdges(b, edgeList, removeEdges);
      affectedBlocks.push(...normalizeBlockOrder(b, blockList));
    });
    const remainingBlocks = blocks.filter((b) => !includesBlock(affectedBlocks, b));
    return [...remainingBlocks, ...affectedBlocks];
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
