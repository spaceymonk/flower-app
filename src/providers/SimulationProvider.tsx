import React from 'react';
import { Memory } from '../services/SimulationHelper';
import { Block, SimulationContextType } from '../types';
import { throwErrorIfNull } from '../util';

const SimulationContext = React.createContext<SimulationContextType | null>(null);

export const SimulationProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const [running, setRunning] = React.useState(false);
  const variableTableRef = React.useRef<Memory> ({});
  const currentBlockRef = React.useRef<Block | null>(null);

  const value: SimulationContextType = {
    isRunning: () => running,
    setRunning,
    variableTableRef,
    currentBlockRef,
  };
  return <SimulationContext.Provider value={value}>{props.children}</SimulationContext.Provider>;
};

export const useSimulationContext = (): SimulationContextType => {
  const context = React.useContext(SimulationContext);
  return throwErrorIfNull(context, 'SimulationContext not initialized');
};
