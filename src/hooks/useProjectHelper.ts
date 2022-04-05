import React from 'react';
import { useAppContext } from '../providers/AppProvider';
import { ProjectData } from '../types';
import { download, load, save, toCode, toPNG } from '../services/ProjectHelper';

export const useProjectHelper = () => {
  const { setTitle, setInputParams, setEdges, setBlocks, getTitle, getInputParams, getBlocks, getEdges } = useAppContext();

  return {
    load: React.useCallback(
      (pd: ProjectData) => {
        load(pd, { setEdges, setBlocks, setTitle, setInputParams });
      },
      [setEdges, setBlocks, setTitle, setInputParams]
    ),
    save: React.useCallback(() => {
      save({ title: getTitle(), inputParams: getInputParams(), blocks: getBlocks(), edges: getEdges() });
    }, [getTitle, getInputParams, getBlocks, getEdges]),
    download: React.useCallback(() => {
      download({ title: getTitle(), inputParams: getInputParams(), blocks: getBlocks(), edges: getEdges() });
    }, [getEdges, getInputParams, getBlocks, getTitle]),
    toPNG: React.useCallback(async () => {
      toPNG(getTitle());
    }, [getTitle]),
    toCode: React.useCallback(() => {
      return toCode({ title: getTitle(), inputParams: getInputParams(), blocks: getBlocks(), edges: getEdges() });
    }, [getEdges, getInputParams, getBlocks, getTitle]),
  };
};
