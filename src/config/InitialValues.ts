import { Edge } from 'react-flow-renderer';
import { Block, ProjectData } from '../types';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { nameof } from '../util';

export const ProjectNameOptions = {
  dictionaries: [colors, adjectives, animals],
  separator: '-',
};

class Initial {
  public title: string = '';
  public defaultBlocks: Block[] = [];
  public defaultEdges: Edge[] = [];
  public inputParams: string = '';

  constructor() {
    this.refresh();
  }

  refresh(): void {
    const storageNodes = window.localStorage.getItem(nameof<ProjectData>('blocks')) || '[]';
    const storageEdges = window.localStorage.getItem(nameof<ProjectData>('edges')) || '[]';
    this.defaultBlocks = JSON.parse(storageNodes);
    this.defaultEdges = JSON.parse(storageEdges);
    this.title = window.localStorage.getItem(nameof<ProjectData>('title')) || uniqueNamesGenerator(ProjectNameOptions);
    this.inputParams = window.localStorage.getItem(nameof<ProjectData>('inputParams')) || '';
  }

  empty(): ProjectData {
    return {
      title: uniqueNamesGenerator(ProjectNameOptions),
      blocks: [],
      edges: [],
      inputParams: '',
    };
  }

  get(): ProjectData {
    return {
      title: this.title,
      blocks: this.defaultBlocks,
      edges: this.defaultEdges,
      inputParams: this.inputParams,
    };
  }
}

export default new Initial();
