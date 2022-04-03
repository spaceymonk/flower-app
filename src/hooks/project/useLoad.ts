import React from 'react';
import { useAppContext } from '../../providers/AppProvider';
import { ProjectData } from '../../types';

const useLoad = () => {
  const { setTitle, setInputParams, setEdges, setBlocks } = useAppContext();

  const load = React.useCallback(
    ({ edges, blocks, title, inputParams }: ProjectData) => {
      setEdges(edges);
      setBlocks(blocks);
      setTitle(title);
      setInputParams(inputParams);
    },
    [setEdges, setBlocks, setTitle, setInputParams]
  );

  return load;
};

export default useLoad;
