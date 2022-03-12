import { BlockService } from './BlockService';

export class Parser {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
    this.validate();
  }

  validate() {
    let startBlockCount = 0;
    let stopBlockCount = 0;

    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (n.type === 'start') {
        startBlockCount += 1;
        if (startBlockCount > 1) throw Error('There are multiple START blocks!');
        this.setCurrentNode(n);
      }
      if (n.type === 'stop') {
        stopBlockCount += 1;
        if (stopBlockCount > 1) throw Error('There are multiple STOP blocks!');
      }

      if (n.handleBounds.source) {
        const x = this.edges.find((e) => e.source === n.id);
        if (!x || n.handleBounds.source.length === x.length)
          throw Error('Source Connectors not matching for block: ' + n.id);
      }

      if (n.handleBounds.target) {
        const x = this.edges.find((e) => e.target === n.id);
        if (!x || n.handleBounds.target.length === x.length)
          throw Error('Target Connectors not matching for block: ' + n.id);
      }
    }

    if (startBlockCount === 0) throw Error('There are no START block!');
    if (stopBlockCount === 0) throw Error('There are no STOP block!');
  }

  parse() {
    console.log('[parser] current block: ', this.currentNode);
    //todo
    this.next();
  }

  hasNext() {
    for (let i = 0; i < this.edges.length; ++i) {
      const e = this.edges[i];
      if (e.source === this.currentNode.id) return true;
    }
    return false;
  }

  next(handleId) {
    const edge = this.edges.find((e) => e.source === this.currentNode.id);
    let node;
    if (handleId) node = this.nodes.find((n) => edge.handleId === handleId && n.id === edge.target);
    else node = this.nodes.find((n) => n.id === edge.target);
    this.setCurrentNode(node);
  }

  setCurrentNode(node) {
    if (node) {
      this.currentNode = node;
      BlockService.instance().highlightNode(node.id);
    } else {
      throw Error('Next node is not available!');
    }
  }
}
