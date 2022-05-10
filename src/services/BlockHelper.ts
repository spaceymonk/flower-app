import { CreateBlockDto } from '../dto/CreateBlockDto';
import Block from '../model/Block';
import DecisionBlock from '../model/block/DecisionBlock';
import LoadBlock from '../model/block/LoadBlock';
import StartBlock from '../model/block/StartBlock';
import StatementBlock from '../model/block/StatementBlock';
import StopBlock from '../model/block/StopBlock';
import StoreBlock from '../model/block/StoreBlock';
import WhileLoopBlock from '../model/block/WhileLoopBlock';
import { BlockTypes } from '../types';

export class BlockCreateFactory {
  static create(dto: CreateBlockDto): Block {
    if (dto.type === BlockTypes.STATEMENT_BLOCK) {
      return new StatementBlock(dto.position);
    } else if (dto.type === BlockTypes.DECISION_BLOCK) {
      return new DecisionBlock(dto.position);
    } else if (dto.type === BlockTypes.LOAD_BLOCK) {
      return new LoadBlock(dto.position);
    } else if (dto.type === BlockTypes.STORE_BLOCK) {
      return new StoreBlock(dto.position);
    } else if (dto.type === BlockTypes.START_BLOCK) {
      return new StartBlock(dto.position);
    } else if (dto.type === BlockTypes.STOP_BLOCK) {
      return new StopBlock(dto.position);
    } else if (dto.type === BlockTypes.WHILE_LOOP_BLOCK) {
      return new WhileLoopBlock(dto.position);
    } else {
      throw new Error('Unknown block type');
    }
  }
}

export const includesBlock = (blockList: Block[], block: Block): boolean => {
  for (let i = 0; i < blockList.length; i++) {
    if (blockList[i].id === block.id) {
      return true;
    }
  }
  return false;
};

/* ----------------------------------- OLD ---------------------------------- */

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
