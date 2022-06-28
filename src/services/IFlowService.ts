import Block from '../model/Block';
import { ValidationOptions } from '../types';

export interface IFlowService {
  validate(options?: ValidationOptions): [Block, Block];
}
