export default class MultipleStopError extends Error {
  public blockIdList: string[];

  constructor(blockIdList: string[]) {
    super('There are multiple STOP blocks!');
    this.name = 'MultipleStopError';
    this.blockIdList = blockIdList;
  }
}
