import React from 'react';
import { useNodesState, useEdgesState } from 'react-flow-renderer';
import InitialValues from '../config/InitialValues';
import { throwErrorIfNull } from '../util';
import { AppContextType } from '../types';

const AppContext = React.createContext<AppContextType | null>(null);

export const AppProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const [title, setTitle] = React.useState<string>(InitialValues.title);
  const [inputParams, setInputParams] = React.useState<string>(InitialValues.inputParams);
  const [blocks, setBlocks, onBlocksChange] = useNodesState(InitialValues.defaultBlocks);
  const [edges, setEdges, onEdgesChange] = useEdgesState(InitialValues.defaultEdges);

  const value: AppContextType = {
    getTitle: () => title,
    setTitle,
    getInputParams: () => inputParams,
    setInputParams,
    getBlocks: () => blocks,
    setBlocks,
    getEdges: () => edges,
    setEdges,
    onEdgesChange,
    onBlocksChange,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  return throwErrorIfNull(context, 'AppContext not initialized');
};
