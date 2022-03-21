export default class NotConnectedError extends Error {
  constructor(blockId) {
    super('A block has unconnected handles!');
    this.name = 'NotConnectedError';
    this.blockId = blockId;
  }
}
