import Block from '../model/Block';
import Connection from '../model/Connection';

export type ProjectData = {
  title: string;
  inputParams: string;
  blocks: Block[];
  connections: Connection[];
};
