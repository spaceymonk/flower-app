import React from 'react';
import Block from '../model/Block';
import { SimulationActions, SimulationContextType, Memory } from '../types';
import { throwErrorIfNull } from '../util/common';
import { InputHandler } from '../util/InputHandler';
import { toastAndSave } from '../util/IOHelper';
import { OutputHandler } from '../util/OutputHandler';
import { useAppContext } from './AppProvider';

const SimulationContext = React.createContext<SimulationContextType | null>(null);

export const SimulationProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const { getInputParams } = useAppContext();
  const [running, setRunning] = React.useState(false);
  const variableTableRef = React.useRef<Memory>({});
  const currentBlockRef = React.useRef<Block | null>(null);
  const speedInMsRef = React.useRef<number>(500);
  const actionRef = React.useRef(SimulationActions.none);
  const jumpNextBlockRef = React.useRef(false);
  const inputHandler = React.useMemo(() => new InputHandler(getInputParams()), [getInputParams]);
  const outputHandler = React.useMemo(() => new OutputHandler(toastAndSave), []);

  const value: SimulationContextType = {
    isRunning: () => running,
    setRunning,
    getSpeedInMs: () => speedInMsRef.current,
    setSpeedInMs: (val: number) => (speedInMsRef.current = val),
    variableTableRef,
    currentBlockRef,
    actionRef,
    jumpNextBlockRef,
    inputHandler,
    outputHandler,
  };
  return <SimulationContext.Provider value={value}>{props.children}</SimulationContext.Provider>;
};

export const useSimulationContext = (): SimulationContextType => {
  const context = React.useContext(SimulationContext);
  return throwErrorIfNull(context, 'SimulationContext not initialized');
};
