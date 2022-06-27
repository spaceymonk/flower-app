import Block from '../model/Block';
import { PathMapping, ValidationOptions } from '../types';

export interface IFlowService {
  validate(options?: ValidationOptions): [Block, Block];
  mapDecisionPaths(start: Block, mapping: PathMapping): PathMapping;
}
