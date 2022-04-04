export class CircularDependencyError extends Error {
  public blockIdList: string[];

  constructor(blockIdList: string[]) {
    super('Unconditional infinite loop detected!');
    this.name = 'CircularDependencyError';
    this.blockIdList = blockIdList;
  }
}
