import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { nameof } from '../util/common';
import { ProjectData } from '../types';
import Block from '../model/Block';
import Connection from '../model/Connection';
import { BlockCreateFactory } from '../services/helpers/BlockHelper';
import { ConnectionCreateFactory } from '../services/helpers/ConnectionHelper';

export const ProjectNameOptions = {
  dictionaries: [colors, adjectives, animals],
  separator: '_',
};

class LocalStorageManager {
  private _title: string = '';
  private _blocks: Block[] = [];
  private _connections: Connection[] = [];
  private _inputParams: string = '';

  constructor() {
    this.refresh();
  }

  public refresh(): void {
    const storageBlocks = window.localStorage.getItem(nameof<ProjectData>('blocks')) || '[]';
    const storageConnections = window.localStorage.getItem(nameof<ProjectData>('connections')) || '[]';
    this._blocks = JSON.parse(storageBlocks);
    this._connections = JSON.parse(storageConnections);
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
      blocks: this._blocks.map((json: any) => BlockCreateFactory.fromJSON(json)),
      connections: this._connections.map((json: any) => ConnectionCreateFactory.fromJSON(json)),
      inputParams: this._inputParams,
    };
  }

  get title(): string {
    return this._title;
  }
  get blocks(): Block[] {
    return this._blocks.map((json: any) => BlockCreateFactory.fromJSON(json));
  }
  get connections(): Connection[] {
    return this._connections.map((json: any) => ConnectionCreateFactory.fromJSON(json));
  }
  get inputParams(): string {
    return this._inputParams;
  }
}

export default new LocalStorageManager();
