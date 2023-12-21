/**
 * Create a list node with references to its previous and next node
 * @param {*} pValue Value of the node
 * @returns A list node object
 */
export function createListNode(pValue) {
  let value = pValue;
  let nextNode = null;
  let prevNode = null;

  return { value, nextNode, prevNode };
}

/**
 * Create a tree node with references to its left and right children and its parent
 * @param {*} pValue Value of the node
 * @returns A tree node object
 */
export function createTreeNode(pValue) {
  let value = pValue;
  let leftChild = null;
  let rightChild = null;
  let parent = null;

  return { value, leftChild, rightChild, parent };
}
