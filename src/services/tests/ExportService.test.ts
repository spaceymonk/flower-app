import path from 'path';
import fs from 'fs';
import { MultipleStartError, MultipleStopError, NoStartError, NotConnectedError } from '../../exceptions';
import Block from '../../model/Block';
import StartBlock from '../../model/block/StartBlock';
import StopBlock from '../../model/block/StopBlock';
import Connection from '../../model/Connection';
import { BlockRepository } from '../../repositories/impl/BlockRepository';
import { ConnectionRepository } from '../../repositories/impl/ConnectionRepository';
import { BlockCreateFactory } from '../helpers/BlockHelper';
import { ConnectionCreateFactory } from '../helpers/ConnectionHelper';
import { BlockService } from '../impl/BlockService';
import { ExportService } from '../impl/ExportService';
import { FlowService } from '../impl/FlowService';

const p = { x: 0, y: 0 };
let exportService: ExportService;

test('case 1: no start block', () => {
  const blocks = [] as Block[];
  const connections = [] as Connection[];
  createContext(blocks, connections);
  expect(() => exportService.toCode()).toThrowError(NoStartError);
});

test('case 2: not connected blocks', () => {
  const blocks = [new StartBlock(p), new StartBlock(p)] as Block[];
  const connections = [] as Connection[];
  createContext(blocks, connections);
  expect(() => exportService.toCode()).toThrowError(NotConnectedError);
});

test('case 3: multiple start blocks', () => {
  const blocks = [new StartBlock(p), new StartBlock(p), new StopBlock(p)] as Block[];
  const connections = [
    new Connection(blocks[0].id, blocks[2].id, null, null),
    new Connection(blocks[1].id, blocks[2].id, null, null),
  ] as Connection[];
  createContext(blocks, connections);
  expect(() => exportService.toCode()).toThrowError(MultipleStartError);
});

test('case 3: multiple stop blocks', () => {
  const blocks = [new StartBlock(p), new StopBlock(p), new StopBlock(p)] as Block[];
  const connections = [
    new Connection(blocks[0].id, blocks[2].id, null, null),
    new Connection(blocks[1].id, blocks[2].id, null, null),
  ] as Connection[];
  createContext(blocks, connections);
  expect(() => exportService.toCode()).toThrowError(MultipleStopError);
});

describe('case 4: figures', () => {
  const files = fs.readdirSync(path.join(__dirname, 'cases'));
  files.forEach((file) => {
    const filePath = path.join(__dirname, 'cases', file);
    const answerPath = path.join(__dirname, 'answers', file.replace('.json', '.txt'));
    const [blocks, connections] = loadJson(filePath);
    test(`${file}`, () => {
      createContext(blocks, connections);
      const code = exportService.toCode();
      expect(code).toEqual(fs.readFileSync(answerPath, 'utf8'));
    });
  });
});

function createContext(blocks: Block[], connections: Connection[]) {
  const connectionRepository = new ConnectionRepository(new Map(connections.map((c) => [c.id, c])), () => {});
  const blockRepository = new BlockRepository(new Map(blocks.map((block) => [block.id, block])), () => {});
  // @ts-ignore : not used
  const blockService = new BlockService(blockRepository, connectionRepository, undefined);
  const flowService = new FlowService(blockService, blockRepository, connectionRepository);
  // @ts-ignore : not used
  exportService = new ExportService(flowService, blockService, connectionRepository, undefined);
}

function loadJson(filePath: string): [Block[], Connection[]] {
  const json = require(filePath);
  const blocks = json.blocks.map((json: any) => BlockCreateFactory.fromJSON(json));
  const connections = json.connections.map((json: any) => ConnectionCreateFactory.fromJSON(json));
  return [blocks, connections];
}

export {};
