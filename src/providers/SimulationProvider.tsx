import React from 'react';
import { SimulationContextType } from '../types';
import { throwErrorIfNull } from '../services/common';

const SimulationContext = React.createContext<SimulationContextType | null>(null);

export const SimulationProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const [running, setRunning] = React.useState(false);
  const [watchList, setWatchList] = React.useState<any>([]);
  const [variableTable, setVariableTable] = React.useState({});
  const currentBlockRef = React.useRef(null);

  const value: SimulationContextType = {
    isRunning: () => running,
    setRunning,
    getWatchList: () => watchList,
    setWatchList,
    getVariableTable: () => variableTable,
    setVariableTable,
    currentBlockRef,
  };
  return <SimulationContext.Provider value={value}>{props.children}</SimulationContext.Provider>;
};

export const useSimulationContext = () => {
  const context = React.useContext(SimulationContext);
  return throwErrorIfNull(context, 'SimulationContext not initialized');
};
