export default class NoStartError extends Error {
  constructor() {
    super('There is no START block!');
    this.name = 'NoStartError';
  }
}
