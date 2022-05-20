import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { nameof } from '../util';
import { ProjectData } from '../types';
import Block from '../model/Block';
import Connection from '../model/Connection';
import { BlockCreateFactory } from '../services/helpers/BlockHelper';

export const ProjectNameOptions = {
  dictionaries: [colors, adjectives, animals],
  separator: '-',
};

class LocalStorageManager {
  public title: string = '';
  public defaultBlocks: Block[] = [];
  public defaultConnections: Connection[] = [];
  public inputParams: string = '';

  constructor() {
    this.refresh();
  }

  refresh(): void {
    const storageNodes = window.localStorage.getItem(nameof<ProjectData>('blocks')) || '[]';
    const storageConnections = window.localStorage.getItem(nameof<ProjectData>('connections')) || '[]';
    this.defaultBlocks = JSON.parse(storageNodes).map((json: any) => BlockCreateFactory.fromJSON(json));
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

export default new LocalStorageManager();
