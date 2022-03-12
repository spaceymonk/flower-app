export class Parser {
  constructor(nodes) {
    this.nodes = nodes;
  }
  next() {
    console.log('next block');
  }
  hasNext() {
    return true;
  }
}