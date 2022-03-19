import React from 'react';
import InitialValues from '../config/InitialValues';

const useAppContext = () => {
  const [title, setTitle] = React.useState(InitialValues.title);
  const [defaultNodes, setDefaultNodes] = React.useState(InitialValues.defaultNodes);
  const [defaultEdges, setDefaultEdges] = React.useState(InitialValues.defaultEdges);
  const [inputParams, setInputParams] = React.useState(InitialValues.inputParams);
  const [isRunning, setRunning] = React.useState(false);

  return {
    isRunning: () => isRunning,
    setRunning: setRunning,
    getTitle: () => title,
    setTitle: setTitle,
    getDefaultNodes: () => defaultNodes,
    setDefaultNodes: setDefaultNodes,
    getDefaultEdges: () => defaultEdges,
    setDefaultEdges: setDefaultEdges,
    getInputParams: () => inputParams,
    setInputParams: setInputParams,
  };
};

export default useAppContext;
