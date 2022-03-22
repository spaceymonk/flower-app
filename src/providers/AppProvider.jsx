import React from 'react';
import InitialValues from '../config/InitialValues';

export const AppContext = React.createContext(null);

export const AppProvider = (props) => {
  const [title, setTitle] = React.useState(InitialValues.title);
  const [inputParams, setInputParams] = React.useState(InitialValues.inputParams);
  const [nodes, setNodes] = React.useState(InitialValues.defaultNodes);
  const [edges, setEdges] = React.useState(InitialValues.defaultEdges);

  const value = {
    getTitle: () => title,
    setTitle,
    getInputParams: () => inputParams,
    setInputParams,
    getNodes: () => nodes,
    setNodes,
    getEdges: () => edges,
    setEdges,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
