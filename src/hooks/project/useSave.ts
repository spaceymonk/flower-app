import InitialValues from '../../config/InitialValues';
import React from 'react';
import { useAppContext } from '../../providers/AppProvider';
import { ProjectData } from '../../types';
import { nameof } from '../../services/common';

const useSave = () => {
  const { getTitle, getInputParams, getBlocks, getEdges } = useAppContext();
  const save = React.useCallback(() => {
    window.localStorage.clear();
    window.localStorage.setItem(nameof<ProjectData>('blocks'), JSON.stringify(getBlocks()));
    window.localStorage.setItem(nameof<ProjectData>('edges'), JSON.stringify(getEdges()));
    window.localStorage.setItem(nameof<ProjectData>('title'), getTitle());
    window.localStorage.setItem(nameof<ProjectData>('inputParams'), getInputParams());
    InitialValues.refresh();
  }, [getTitle, getInputParams, getBlocks, getEdges]);
  return save;
};

export default useSave;
