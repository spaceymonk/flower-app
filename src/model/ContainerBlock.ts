import Block from './Block';

export abstract class ContainerBlock extends Block {
  isContainer(): boolean {
    return true;
  }
}
