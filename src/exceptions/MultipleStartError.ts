export default class MultipleStartError extends Error {
  public blockIdList: string[];

  constructor(blockIdList: string[]) {
    super('There are multiple START blocks!');
    this.name = 'MultipleStartError';
    this.blockIdList = blockIdList;
  }
}
