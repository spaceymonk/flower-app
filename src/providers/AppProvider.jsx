import React from 'react';
import InitialValues from '../config/InitialValues';

export const AppContext = React.createContext(null);

export const AppProvider = (props) => {
  const [title, setTitle] = React.useState(InitialValues.title);
  const [inputParams, setInputParams] = React.useState(InitialValues.inputParams);

  const value = {
    getTitle: () => title,
    setTitle: setTitle,
    getInputParams: () => inputParams,
    setInputParams: setInputParams,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
