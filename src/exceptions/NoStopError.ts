export class NoStopError extends Error {
  constructor() {
    super('There is no STOP block!');
    this.name = 'NoStopError';
  }
}
