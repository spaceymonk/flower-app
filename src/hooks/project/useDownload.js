import React from 'react';
import { AppContext } from '../../providers/AppProvider';
import FileSaver from 'file-saver';

const useDownload = () => {
  const { getTitle, getInputParams, getNodes, getEdges } = React.useContext(AppContext);

  const download = React.useCallback(() => {
    const payload = {
      title: getTitle(),
      inputParams: getInputParams(),
      nodes: getNodes(),
      edges: getEdges(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, getTitle() + '.json');
  }, [getEdges, getInputParams, getNodes, getTitle]);

  return download;
};

export default useDownload;
