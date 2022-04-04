import FileSaver from 'file-saver';
import React from 'react';
import InitialValues from '../config/InitialValues';
import { useAppContext } from '../providers/AppProvider';
import { nameof, throwErrorIfNull } from '../services/common';
import { ProjectData } from '../types';

export const useProjectService = () => {
  const { setTitle, setInputParams, setEdges, setBlocks, getTitle, getInputParams, getBlocks, getEdges } = useAppContext();

  return {
    load: React.useCallback(
      ({ edges, blocks, title, inputParams }: ProjectData) => {
        setEdges(edges);
        setBlocks(blocks);
        setTitle(title);
        setInputParams(inputParams);
      },
      [setEdges, setBlocks, setTitle, setInputParams]
    ),
    save: React.useCallback(() => {
      window.localStorage.clear();
      window.localStorage.setItem(nameof<ProjectData>('blocks'), JSON.stringify(getBlocks()));
      window.localStorage.setItem(nameof<ProjectData>('edges'), JSON.stringify(getEdges()));
      window.localStorage.setItem(nameof<ProjectData>('title'), getTitle());
      window.localStorage.setItem(nameof<ProjectData>('inputParams'), getInputParams());
      InitialValues.refresh();
    }, [getTitle, getInputParams, getBlocks, getEdges]),
    download: React.useCallback(() => {
      const payload: ProjectData = {
        title: getTitle(),
        inputParams: getInputParams(),
        blocks: getBlocks(),
        edges: getEdges(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      FileSaver.saveAs(blob, getTitle() + '.json');
    }, [getEdges, getInputParams, getBlocks, getTitle]),
    toPNG: React.useCallback(async () => {
      const blob = await DomToImage.toBlob(throwErrorIfNull(document.getElementById('board')), { bgcolor: '#fff' });
      FileSaver.saveAs(blob, getTitle() + '.png');
    }, [getTitle]),
  };
};
