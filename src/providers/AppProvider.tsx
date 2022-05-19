import React from 'react';
import InitialValues from '../config/InitialValues';
import { throwErrorIfNull } from '../util';
import { AppContextType } from '../types';
import Block from '../model/Block';
import Connection from '../model/Connection';
import { useEdgesState, useNodesState } from 'react-flow-renderer';
import BlockAdapter from '../adapters/BlockAdapter';
import ConnectionAdapter from '../adapters/ConnectionAdapter';

const AppContext = React.createContext<AppContextType | null>(null);

/**
 * This component is used to provide the project data to all the components.
 */
export const AppProvider = (props: React.PropsWithChildren<React.ReactNode>) => {
  const [title, setTitle] = React.useState<string>(InitialValues.title);
  const [inputParams, setInputParams] = React.useState<string>(InitialValues.inputParams);
  const [blocks, setBlocks] = React.useState<Block[]>(InitialValues.defaultBlocks);
  const [connections, setConnections] = React.useState<Connection[]>(InitialValues.defaultConnections);

  const nodesState = useNodesState(InitialValues.defaultBlocks.map((b) => BlockAdapter.toNode(b)));
  const edgesState = useEdgesState(InitialValues.defaultConnections.map((c) => new ConnectionAdapter(c)));

  const value: AppContextType = {
    getTitle: () => title,
    setTitle,
    getInputParams: () => inputParams,
    setInputParams,
    getBlocks: () => blocks,
    setBlocks,
    getConnections: () => connections,
    setConnections,
    nodesState,
    edgesState,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  return throwErrorIfNull(context, 'AppContext not initialized');
};
