import Block from './Block';

export abstract class ContainerBlock extends Block {
  override isContainer(): boolean {
    return true;
  }
}
