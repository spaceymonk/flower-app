/* eslint-disable no-unused-vars */
import React from 'react';
import InitialValues from '../../config/InitialValues';

const useAppContextInitials = () => {
  const [title, setTitle] = React.useState(InitialValues.title);
  const [inputParams, setInputParams] = React.useState(InitialValues.inputParams);
  const [isRunning, setRunning] = React.useState(false);

  return {
    isRunning: () => isRunning,
    setRunning: setRunning,
    getTitle: () => title,
    setTitle: setTitle,
    getInputParams: () => inputParams,
    setInputParams: setInputParams,
  };
};

export default useAppContextInitials;
