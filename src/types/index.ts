import Block from '../model/Block';
import Connection from '../model/Connection';
import { Memory } from '../services/SimulationHelper';

export type ProjectData = {
  title: string;
  inputParams: string;
  blocks: Block[];
  connections: Connection[];
};

export enum ExportType {
  PNG,
  CODE,
}

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

export type Point2D = {
  x: number;
  y: number;
};

export type AppContextType = {
  getTitle: () => string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  getInputParams: () => string;
  setInputParams: React.Dispatch<React.SetStateAction<string>>;
  getBlocks: () => Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  getConnections: () => Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
};

export type SimulationContextType = {
  isRunning: () => boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  variableTableRef: React.MutableRefObject<Memory>;
  currentBlockRef: React.MutableRefObject<Block | null>;
  inputParamCursor: React.MutableRefObject<number>;
};
