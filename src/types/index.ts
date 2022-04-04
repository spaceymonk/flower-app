import { Node, Edge, OnEdgesChange, OnNodesChange } from 'react-flow-renderer';

export type ProjectData = {
  title: string;
  inputParams: string;
  blocks: Block[];
  edges: Edge[];
};

export enum DecisionBlockHandle {
  FALSE = 'false',
  TRUE = 'true',
}

export enum ContainerBlockHandle {
  OUTER_TARGET = 'outer_target',
  INNER_TARGET = 'inner_target',
  OUTER_SOURCE = 'outer_source',
  INNER_SOURCE = 'inner_source',
}

export enum BlockTypes {
  DECISION_BLOCK = 'decision',
  STATEMENT_BLOCK = 'statement',
  LOAD_BLOCK = 'load',
  STORE_BLOCK = 'store',
  START_BLOCK = 'start',
  STOP_BLOCK = 'stop',
  WHILE_LOOP_BLOCK = 'while',
}

export enum EdgeTypes {
  CUSTOM_EDGE = 'custom',
}

export enum GlowTypes {
  NONE,
  NORMAL,
  ERROR,
}

export type BlockData = {
  text?: string;
  glow?: GlowTypes;
  name?: string;
  width?: number;
  height?: number;
};

export enum SimulationActions {
  none,
  stop,
  continue,
  debug,
}

export interface Block extends Node<BlockData> {}

export type AppContextType = {
  getTitle: () => string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  getInputParams: () => string;
  setInputParams: React.Dispatch<React.SetStateAction<string>>;
  getBlocks: () => Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  getEdges: () => Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
  onBlocksChange: OnNodesChange;
};

export type SimulationContextType = {
  isRunning: () => boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  getWatchList: () => any[];
  setWatchList: React.Dispatch<React.SetStateAction<any[]>>;
  getVariableTable: () => {};
  setVariableTable: React.Dispatch<React.SetStateAction<{}>>;
  currentBlockRef: React.MutableRefObject<any>;
};
