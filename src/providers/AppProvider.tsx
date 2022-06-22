import React from 'react';
import LocalStorageManager from '../config/LocalStorageManager';
import { throwErrorIfNull } from '../util/common';
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
  const projectData = LocalStorageManager.get();
  const [title, setTitle] = React.useState<string>(projectData.title);
  const [inputParams, setInputParams] = React.useState<string>(projectData.inputParams);

  const blockMapRef = React.useRef<Map<string, Block>>(new Map());
  const connectionMapRef = React.useRef<Map<string, Connection>>(new Map());

  React.useEffect(() => {
    projectData.blocks.forEach((b) => blockMapRef.current.set(b.id, b));
    projectData.connections.forEach((c) => connectionMapRef.current.set(c.id, c));
  }, [projectData.blocks, projectData.connections]);

  const nodesState = useNodesState(projectData.blocks.map((b) => BlockAdapter.toNode(b)));
  const edgesState = useEdgesState(projectData.connections.map((c) => ConnectionAdapter.toEdge(c)));

  const value: AppContextType = {
    getTitle: () => title,
    setTitle,
    getInputParams: () => inputParams,
    setInputParams,
    blockMapRef,
    connectionMapRef,
    nodesState,
    edgesState,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext);
  return throwErrorIfNull(context, 'AppContext not initialized');
};
