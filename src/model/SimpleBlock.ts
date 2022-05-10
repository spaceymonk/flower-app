import Block from './Block';

export abstract class SimpleBlock extends Block {
  isContainer(): boolean {
    return false;
  }
}
