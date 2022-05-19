import { ProjectData } from '../types';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { nameof } from '../util';
import Block from '../model/Block';
import Connection from '../model/Connection';

export const ProjectNameOptions = {
  dictionaries: [colors, adjectives, animals],
  separator: '-',
};

class Initial {
  public title: string = '';
  public defaultBlocks: Block[] = [];
  public defaultConnections: Connection[] = [];
  public inputParams: string = '';

  constructor() {
    this.refresh();
  }

  refresh(): void {
    // @todo: better serializer required for class instances
    const storageNodes = window.localStorage.getItem(nameof<ProjectData>('blocks')) || '[]';
    const storageConnections = window.localStorage.getItem(nameof<ProjectData>('connections')) || '[]';
    this.defaultBlocks = JSON.parse(storageNodes);
    this.defaultConnections = JSON.parse(storageConnections);
    this.title = window.localStorage.getItem(nameof<ProjectData>('title')) || uniqueNamesGenerator(ProjectNameOptions);
    this.inputParams = window.localStorage.getItem(nameof<ProjectData>('inputParams')) || '';
  }

  empty(): ProjectData {
    return {
      title: uniqueNamesGenerator(ProjectNameOptions),
      blocks: [],
      connections: [],
      inputParams: '',
    };
  }

  get(): ProjectData {
    return {
      title: this.title,
      blocks: this.defaultBlocks,
      connections: this.defaultConnections,
      inputParams: this.inputParams,
    };
  }
}

export default new Initial();
