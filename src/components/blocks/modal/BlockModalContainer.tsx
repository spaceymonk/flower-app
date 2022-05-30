import React from 'react';
import {
  DecisionBlockModal,
  FunctionBlockModal,
  LoadBlockkModal,
  StartBlockModal,
  StatementBlockModal,
  StoreBlockModal,
  StopBlockModal,
  WhileLoopBlockModal,
} from '..';
import { BlockTypes } from '../../../types';
import PropTypes from 'prop-types';
import Block from '../../../model/Block';
import FunctionBlock from '../../../model/block/FunctionBlock';

export function BlockModalContainer({ block, show, onClose }: BlockModalContainerProps) {
  if (!block) {
    return <></>;
  } else if (block.type === BlockTypes.DECISION_BLOCK) {
    return <DecisionBlockModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.LOAD_BLOCK) {
    return <LoadBlockkModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.START_BLOCK) {
    return <StartBlockModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.STORE_BLOCK) {
    return <StoreBlockModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.STOP_BLOCK) {
    return <StopBlockModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.WHILE_LOOP_BLOCK) {
    return <WhileLoopBlockModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.STATEMENT_BLOCK) {
    return <StatementBlockModal block={block} show={show} onClose={onClose} />;
  } else if (block.type === BlockTypes.FUNCTION_BLOCK) {
    return <FunctionBlockModal block={block as FunctionBlock} show={show} onClose={onClose} />;
  } else {
    throw new Error(`Unknown block type: ${block.type}`);
  }
}

BlockModalContainer.propTypes = {
  block: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export interface BlockModalContainerProps extends PropTypes.InferProps<typeof BlockModalContainer.propTypes> {
  block: Block | null;
  show: boolean;
  onClose: () => void;
}
