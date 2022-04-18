export class InvalidDecisionError extends Error {
  public blockId: string;

  constructor(blockId: string) {
    super('Decision block configuration is not valid!');
    this.name = 'InvalidDecisionError';
    this.blockId = blockId;
  }
}
