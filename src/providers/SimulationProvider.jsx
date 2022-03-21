import React from 'react';

export const SimulationContext = React.createContext(null);

export const SimulationProvider = (props) => {
  const [running, setRunning] = React.useState(false);
  const [watchList, setWatchList] = React.useState([]);
  const [variableTable, setVariableTable] = React.useState({});
  const [currentBlock, setCurrentBlock] = React.useState(null);

  const value = {
    isRunning: () => running,
    setRunning,
    getWatchList: () => watchList,
    setWatchList,
    getVariableTable: () => variableTable,
    setVariableTable,
    getCurrentBlock: () => currentBlock,
    setCurrentBlock,
  };
  return <SimulationContext.Provider value={value}>{props.children}</SimulationContext.Provider>;
};
