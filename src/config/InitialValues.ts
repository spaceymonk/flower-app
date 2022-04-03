import { Edge } from 'react-flow-renderer';
import { Block } from '../types';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

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

  refresh() {
    const storageNodes = window.localStorage.getItem('nodes') || '[]';
    const storageEdges = window.localStorage.getItem('edges') || '[]';
    this.defaultBlocks = JSON.parse(storageNodes);
    this.defaultEdges = JSON.parse(storageEdges);
    this.title = window.localStorage.getItem('title') || uniqueNamesGenerator(ProjectNameOptions);
    this.inputParams = window.localStorage.getItem('inputParams') || '';
  }

  empty() {
    return {
      title: uniqueNamesGenerator(ProjectNameOptions),
      nodes: [],
      edges: [],
      inputParams: '',
    };
  }
}

export default new Initial();
