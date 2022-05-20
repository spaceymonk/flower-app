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
  private _title: string = '';
  private _defaultBlocks: Block[] = [];
  private _defaultConnections: Connection[] = [];
  private _inputParams: string = '';

  constructor() {
    this.refresh();
  }

  public refresh(): void {
    const storageNodes = window.localStorage.getItem(nameof<ProjectData>('blocks')) || '[]';
    const storageConnections = window.localStorage.getItem(nameof<ProjectData>('connections')) || '[]';
    this._defaultBlocks = JSON.parse(storageNodes);
    this._defaultConnections = JSON.parse(storageConnections);
    this._title = window.localStorage.getItem(nameof<ProjectData>('title')) || uniqueNamesGenerator(ProjectNameOptions);
    this._inputParams = window.localStorage.getItem(nameof<ProjectData>('inputParams')) || '';
  }

  public empty(): ProjectData {
    return {
      title: uniqueNamesGenerator(ProjectNameOptions),
      blocks: [],
      connections: [],
      inputParams: '',
    };
  }

  public get(): ProjectData {
    return {
      title: this._title,
      blocks: this._defaultBlocks.map((json: any) => BlockCreateFactory.fromJSON(json)),
      connections: this._defaultConnections.map((json: any) => json),
      inputParams: this._inputParams,
    };
  }
}

export default new LocalStorageManager();
