import React from 'react';
import { useReactFlow } from 'react-flow-renderer';
import { AppContext } from '../../pages/App';

const useDownload = () => {
  const { getNodes, getEdges } = useReactFlow();
  const { getTitle, getInputParams } = React.useContext(AppContext);

  const download = React.useCallback(() => {
    const payload = {
      nodes: getNodes(),
      edges: getEdges(),
      title: getTitle(),
      inputParams: getInputParams(),
    };
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = getTitle();
    document.body.appendChild(element);
    element.click();
  }, [getEdges, getInputParams, getNodes, getTitle]);

  return download;
};

export default useDownload;