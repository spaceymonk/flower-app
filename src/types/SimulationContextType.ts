import React from 'react';
import Block from '../model/Block';
import { Memory, SimulationActions } from '../types';
import { InputHandler } from '../util/InputHandler';
import { OutputHandler } from '../util/OutputHandler';

export type SimulationContextType = {
  isRunning: () => boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  variableTableRef: React.MutableRefObject<Memory>;
  currentBlockRef: React.MutableRefObject<Block | null>;
  getSpeedInMs: () => number;
  setSpeedInMs: (val: number) => number;
  stepCountRef: React.MutableRefObject<number>;
  actionRef: React.MutableRefObject<SimulationActions>;
  jumpNextBlockRef: React.MutableRefObject<boolean>;
  inputHandler: InputHandler;
  outputHandler: OutputHandler;
};
