import React from 'react';
import {useNodesState, useEdgesState} from 'react-flow-renderer';
import InitialValues from '../config/InitialValues';

export const AppContext = React.createContext(null);

export const AppProvider = (props) => {
  const [title, setTitle] = React.useState(InitialValues.title);
  const [inputParams, setInputParams] = React.useState(InitialValues.inputParams);
  const [nodes, setNodes, onNodesChange] = useNodesState(InitialValues.defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(InitialValues.defaultEdges);

  const value = {
    getTitle: () => title,
    setTitle,
    getInputParams: () => inputParams,
    setInputParams,
    getNodes: () => nodes,
    setNodes,
    getEdges: () => edges,
    setEdges,
    onEdgesChange,
    onNodesChange,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
