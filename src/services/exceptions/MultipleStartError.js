export default class MultipleStartError extends Error {
  constructor(blockIdList) {
    super('There are multiple START blocks!');
    this.name = 'MultipleStartError';
    this.blockIdList = blockIdList;
  }
}
