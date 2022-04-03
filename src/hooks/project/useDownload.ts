import React from 'react';
import FileSaver from 'file-saver';
import { useAppContext } from '../../providers/AppProvider';
import { ProjectData } from '../../types';

const useDownload = () => {
  const { getTitle, getInputParams, getBlocks, getEdges } = useAppContext();

  const download = React.useCallback(() => {
    const payload: ProjectData = {
      title: getTitle(),
      inputParams: getInputParams(),
      blocks: getBlocks(),
      edges: getEdges(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    FileSaver.saveAs(blob, getTitle() + '.json');
  }, [getEdges, getInputParams, getBlocks, getTitle]);

  return download;
};

export default useDownload;
