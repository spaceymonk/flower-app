import Block from './Block';

export abstract class SimpleBlock extends Block {
  override isContainer(): boolean {
    return false;
  }
}
