export class BlockNotFoundError extends Error {
  public blockId: string;

  constructor(blockId: string) {
    super('Block not found with id: ' + blockId);
    this.name = 'NotConnectedError';
    this.blockId = blockId;
  }
}
