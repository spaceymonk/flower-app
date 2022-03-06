export class BlockService {
  constructor({ setNodes, getNodes }) {
    this.setNodes = setNodes;
    this.getNodes = getNodes;
  }

  static instance(args) {
    if (!BlockService._instance) {
      if (!args) throw Error('Initiate BlockService first!');
      BlockService._instance = new BlockService(args);
    }
    return BlockService._instance;
  }

  updateNodes(updatedNode) {
    this.setNodes((nodes) => nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
  }

  addNodes(createdNode) {
    this.setNodes((nodes) => [...nodes, createdNode]);
  }

  removeNodes(removedNode) {
    this.setNodes((nodes) => nodes.filter((n) => n.id !== removedNode.id));
  }
}
