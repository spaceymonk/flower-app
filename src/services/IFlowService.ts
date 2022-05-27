import Block from '../model/Block';
import { PathMapping } from '../types';

export interface IFlowService {
  validate(): [Block, Block];
  mapDecisionPaths(start: Block, mapping: PathMapping): PathMapping;
}
