/**
 * @param {Node[]} nodeList 
 * @param {Node} node 
 * @returns {boolean} true if block list contains given block
 */
export const includesNode = (nodeList, node) => {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].id === node.id) {
      return true;
    }
  }
  return false;
};

/**
 * removes parent metadata from given node. Change done in place.
 * @param {Node} node 
 */
export const clearParentNode = (node) => {
  node.parentNode = undefined;
  node.extent = undefined;
};

/**
 * @param {Node[]} nodeList 
 * @param {Node} node 
 * @returns {Node|undefined} parent node of given node, undefined if no parent
 */
export const getParentNode = (nodeList, node) => {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].id === node.parentNode) {
      return nodeList[i];
    }
  }
  return undefined;
}