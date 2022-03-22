import { AppContext } from '../../providers/AppProvider';
import InitialValues from '../../config/InitialValues';
import React from 'react';

const useSave = () => {
  const { getTitle, getInputParams, getNodes, getEdges } = React.useContext(AppContext);
  const save = React.useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();
    window.localStorage.clear();
    window.localStorage.setItem('nodes', JSON.stringify(nodes));
    window.localStorage.setItem('edges', JSON.stringify(edges));
    window.localStorage.setItem('title', getTitle());
    window.localStorage.setItem('inputParams', getInputParams());
    InitialValues.refresh();
  }, [getTitle, getInputParams, getNodes, getEdges]);
  return save;
};

export default useSave;
