export default class MultipleStopError extends Error {
  constructor(blockIdList) {
    super('There are multiple STOP blocks!');
    this.name = 'MultipleStopError';
    this.blockIdList = blockIdList;
  }
}
