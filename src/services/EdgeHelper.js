/**
 * @param {Edge[]} edgeList 
 * @param {Edge} edge 
 * @returns {boolean} true if edgeList contains edge
 */
export const includesEdge = (edgeList, edge) => {
  for (let i = 0; i < edgeList.length; i++) {
    if (edgeList[i].id === edge.id) {
      return true;
    }
  }
  return false;
}