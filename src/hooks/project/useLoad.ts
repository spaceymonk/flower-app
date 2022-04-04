import React from 'react';
import { useAppContext } from '../../providers/AppProvider';
import { ProjectData } from '../../types';
import { toast } from 'react-toastify';

const useLoad = () => {
  const { setTitle, setInputParams, setEdges, setBlocks } = useAppContext();

  const load = React.useCallback(
    ({ edges, blocks, title, inputParams }: ProjectData) => {
      setEdges(edges);
      setBlocks(blocks);
      setTitle(title);
      setInputParams(inputParams);
      toast.success('Project loaded');
    },
    [setEdges, setBlocks, setTitle, setInputParams]
  );

  return load;
};

export default useLoad;
