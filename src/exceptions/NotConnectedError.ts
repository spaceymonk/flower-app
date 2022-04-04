export class NotConnectedError extends Error {
  public blockId: string;

  constructor(blockId: string) {
    super('A block has unconnected handles!');
    this.name = 'NotConnectedError';
    this.blockId = blockId;
  }
}
