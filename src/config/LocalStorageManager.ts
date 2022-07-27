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
    let storageBlocks = window.localStorage.getItem(nameof<ProjectData>('blocks'));
    let storageConnections = window.localStorage.getItem(nameof<ProjectData>('connections'));
    let title = window.localStorage.getItem(nameof<ProjectData>('title'));
    let inputParams = window.localStorage.getItem(nameof<ProjectData>('inputParams'));

    if (storageBlocks === null || storageConnections === null || title === null || inputParams === null) {
      // load example project
      storageBlocks = exampleProjectJson.blocks;
      storageConnections = exampleProjectJson.connections;
      title = exampleProjectJson.title;
      inputParams = exampleProjectJson.inputParams;
    }

    this._blocks = JSON.parse(storageBlocks);
    this._connections = JSON.parse(storageConnections);
    this._title = title;
    this._inputParams = inputParams;
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

const exampleProjectJson = {
  title: 'example_is_prime',
  blocks:
    '[{"id":"743e29b5-c4e0-404a-b08a-b7c47713e6f8","type":"start","position":{"x":130,"y":-160},"text":"","parentNodeId":null,"width":150,"height":50},{"id":"85cef68a-d913-4908-b840-74e95e5552c8","type":"stop","position":{"x":-120,"y":780},"text":"","parentNodeId":null,"width":150,"height":50},{"id":"b557f02e-ed62-4d8b-8b4b-47eae2e48d1c","type":"load","position":{"x":130,"y":-50},"text":"n","parentNodeId":null,"width":150,"height":50},{"id":"9c889004-0c70-494a-b4cb-25833761ba80","type":"store","position":{"x":230,"y":650},"text":"false","parentNodeId":null,"width":150,"height":50},{"id":"8f627f77-54e3-47db-ade1-fec515eb2f10","type":"decision","position":{"x":130,"y":40},"text":"n < 2","parentNodeId":null,"width":150,"height":45},{"id":"de9de071-99f5-4151-9279-560b681f740c","type":"statement","position":{"x":-120,"y":200},"text":"flag = true","parentNodeId":null,"width":150,"height":45},{"id":"2cdb010e-d1f8-4d9e-a0cb-b8972ce86c16","type":"statement","position":{"x":-120,"y":100},"text":"i = 2","parentNodeId":null,"width":150,"height":45},{"id":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","type":"while","position":{"x":-260,"y":300},"text":"i <= n/2 && flag === true","parentNodeId":null,"width":426,"height":301},{"id":"3501ebdc-bf0c-401b-8562-a08b1e268657","type":"decision","position":{"x":135,"y":85},"text":"n % i === 0","parentNodeId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","width":150,"height":45},{"id":"6a5e3c5f-3b3e-4b1b-93c6-2421b674b0c0","type":"statement","position":{"x":255,"y":165},"text":"flag = false","parentNodeId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","width":150,"height":45},{"id":"a08f32e5-077a-42a4-9e1b-b1fe7d3edcfd","type":"statement","position":{"x":25,"y":165},"text":"i = i + 1","parentNodeId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","width":150,"height":45},{"id":"b7c01bd9-2ac9-40d6-8283-7cf64a9ebcb0","type":"store","position":{"x":-120,"y":660},"text":"flag","parentNodeId":null,"width":150,"height":50}]',
  connections:
    '[{"id":"01172e88-8321-4a22-ba7e-91c8d110183c","sourceId":"743e29b5-c4e0-404a-b08a-b7c47713e6f8","targetId":"b557f02e-ed62-4d8b-8b4b-47eae2e48d1c","sourceHandle":null,"targetHandle":null},{"id":"7fbeed02-54ac-4d67-8928-5ec2fceb1c48","sourceId":"b557f02e-ed62-4d8b-8b4b-47eae2e48d1c","targetId":"8f627f77-54e3-47db-ade1-fec515eb2f10","sourceHandle":null,"targetHandle":null},{"id":"fd2f4db3-0aed-46bf-96f5-39857b0b5b14","sourceId":"8f627f77-54e3-47db-ade1-fec515eb2f10","targetId":"9c889004-0c70-494a-b4cb-25833761ba80","sourceHandle":"true","targetHandle":null},{"id":"b9016da9-421f-4439-8940-13f9fbbdc3cf","sourceId":"9c889004-0c70-494a-b4cb-25833761ba80","targetId":"85cef68a-d913-4908-b840-74e95e5552c8","sourceHandle":null,"targetHandle":null},{"id":"39b3db13-3f28-4f68-aecf-bad7127437cd","sourceId":"8f627f77-54e3-47db-ade1-fec515eb2f10","targetId":"2cdb010e-d1f8-4d9e-a0cb-b8972ce86c16","sourceHandle":"false","targetHandle":null},{"id":"1aa2a5f6-19e0-4642-bde2-6fa61c0a5a1e","sourceId":"2cdb010e-d1f8-4d9e-a0cb-b8972ce86c16","targetId":"de9de071-99f5-4151-9279-560b681f740c","sourceHandle":null,"targetHandle":null},{"id":"6949d952-ea5b-4d7e-9a11-59e94ebc54ba","sourceId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","targetId":"3501ebdc-bf0c-401b-8562-a08b1e268657","sourceHandle":"inner_source","targetHandle":null},{"id":"923395fa-dff8-47d2-8f3c-b97fae3140ba","sourceId":"3501ebdc-bf0c-401b-8562-a08b1e268657","targetId":"6a5e3c5f-3b3e-4b1b-93c6-2421b674b0c0","sourceHandle":"true","targetHandle":null},{"id":"73e44caa-82e0-4545-a7cf-7aead3a9286a","sourceId":"3501ebdc-bf0c-401b-8562-a08b1e268657","targetId":"a08f32e5-077a-42a4-9e1b-b1fe7d3edcfd","sourceHandle":"false","targetHandle":null},{"id":"0cef3c61-9079-429c-959d-a6af088d89ac","sourceId":"a08f32e5-077a-42a4-9e1b-b1fe7d3edcfd","targetId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","sourceHandle":null,"targetHandle":"inner_target"},{"id":"430d5e42-2706-4c0a-a7aa-a05ae94848a0","sourceId":"6a5e3c5f-3b3e-4b1b-93c6-2421b674b0c0","targetId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","sourceHandle":null,"targetHandle":"inner_target"},{"id":"8c260f34-75f4-4e51-9a01-2cd3cbc4e14b","sourceId":"de9de071-99f5-4151-9279-560b681f740c","targetId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","sourceHandle":null,"targetHandle":"outer_target"},{"id":"3ae17dee-1c3f-40a5-8b98-d0e2ca1c4838","sourceId":"9d006e7f-2a2e-4b60-ac37-c1876ca42e6f","targetId":"b7c01bd9-2ac9-40d6-8283-7cf64a9ebcb0","sourceHandle":"outer_source","targetHandle":null},{"id":"5bdc085a-861a-40ae-b5e2-592859aa1abf","sourceId":"b7c01bd9-2ac9-40d6-8283-7cf64a9ebcb0","targetId":"85cef68a-d913-4908-b840-74e95e5552c8","sourceHandle":null,"targetHandle":null}]',
  inputParams: '',
};

export default new LocalStorageManager();
