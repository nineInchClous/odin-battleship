import { createListNode } from './node';

/**
 * Create a linked list
 * @returns A linked list
 */
export default function createLinkedList() {
  let head = null;
  let tail = null;
  let size = 0;

  /**
   * Enqueue a value to the end of the linked list
   * @param {*} pValue The value to enqueue
   */
  const append = (pValue) => {
    const newNode = createListNode(pValue);

    if (tail === null) {
      tail = newNode;
      head = tail;
    } else {
      const prevTail = tail;
      tail = newNode;
      tail.prevNode = prevTail;
      prevTail.nextNode = tail;
    }

    size += 1;
  };

  /**
   * Push a value to the head of the linked list
   * @param {*} pValue The value to push
   */
  const prepend = (pValue) => {
    const newNode = createListNode(pValue);

    if (head === null) {
      head = newNode;
      tail = head;
    } else {
      const prevHead = head;
      head = newNode;
      head.nextNode = prevHead;
      prevHead.prevNode = head;
    }

    size += 1;
  };

  /**
   * Remove the first value of the linked list
   * @returns The first value of the linked list
   * @throws {Error} Throws an error if the linked list is empty
   */
  const dequeue = () => {
    if (size === 0) {
      throw new Error('The linked list is empty.');
    }

    const prevHead = head;
    if (size === 1) {
      head = null;
      tail = null;
    } else {
      head = prevHead.nextNode;
      prevHead.nextNode = null;
      head.prevNode = null;
    }

    size -= 1;

    return prevHead.value;
  };

  /**
   * Remove the last value of the linked list
   * @returns The last value of the linked list
   * @throws {Error} Throws an error if the linked list is empty
   */
  const pop = () => {
    if (size === 0) {
      throw new Error('The linked list is empty.');
    }

    const prevTail = tail;
    if (size === 1) {
      tail = null;
      head = null;
    } else {
      tail = prevTail.prevNode;
      tail.nextNode = null;
      prevTail.prevNode = null;
    }

    size -= 1;

    return prevTail.value;
  };

  /**
   * Insert a value at the given index
   * @param {number} pIndex The index where to insert a value
   * @param {*} pValue The value to insert
   * @throws {RangeError} Throws an error if the index is out of range of the linked list
   */
  const insertAt = (pIndex, pValue) => {
    if (pIndex > size + 1 || pIndex < 0) {
      throw new RangeError(
        `Argument out of range. Size of the linked list is ${size}.`
      );
    }

    if (pIndex === 0) {
      prepend(pValue);
    } else if (pIndex === size) {
      append(pValue);
    } else {
      let i = 0;
      let currNode = head;
      while (i < pIndex - 1) {
        i += 1;
        currNode = currNode.nextNode;
      }

      const newNode = createListNode(pValue);
      const prevNext = currNode.nextNode;
      currNode.nextNode = newNode;
      newNode.prevNode = currNode;
      newNode.nextNode = prevNext;
      prevNext.prevNode = newNode;
      size += 1;
    }
  };

  /**
   * Remove a value at the given index
   * @param {number} pIndex The index where to remove a value
   * @returns The removed value
   * @throws {RangeError} Throws an error if the index is out of range of the linked list
   * @throws {Error} Throws an error if the list is empty
   */
  const removeAt = (pIndex) => {
    if (size === 0) {
      throw new Error('The linked list is empty.');
    }
    if (pIndex >= size || pIndex < 0) {
      throw new RangeError(
        `Argument out of range. Size of the linked list is ${size}.`
      );
    }

    if (pIndex === 0) {
      return dequeue();
    }
    if (pIndex === size - 1) {
      return pop();
    }
    let i = 0;
    let currNode = head;
    while (i < pIndex) {
      i += 1;
      currNode = currNode.nextNode;
    }

    currNode.prevNode.nextNode = currNode.nextNode;
    currNode.nextNode.prevNode = currNode.prevNode;
    currNode.prevNode = null;
    currNode.nextNode = null;
    size -= 1;
    return currNode.value;
  };

  /**
   * Get the size of the linked list
   * @returns The size of the linked list
   */
  const getSize = () => size;

  /**
   * Get the value of the head of the linked list or null if the list is empty
   * @returns The value head of the linked list
   */
  const getHead = () => {
    if (head === null) {
      return null;
    }

    return head.value;
  };

  /**
   * Get the value of the tail of the linked list or null if the list is empty
   * @returns The value of the tail of the linked list
   */
  const getTail = () => {
    if (tail === null) {
      return null;
    }

    return tail.value;
  };

  /**
   * Get the value at the given index in the linked list
   * @param {number} pIndex The index where to get the value
   * @returns The value at the given index
   * @throws {Error} Throws an error if the linked list is empty
   * @throws {RangeError} Throws an error if the index is out of range of the linked list
   */
  const getValueAt = (pIndex) => {
    if (size === 0) {
      throw new Error('The linked list is empty.');
    }
    if (pIndex >= size || pIndex < 0) {
      throw new RangeError(
        `Argument out of range. Size of the linked list is ${size}.`
      );
    }

    let i = 0;
    let currNode = head;
    while (i !== pIndex) {
      i += 1;
      currNode = currNode.nextNode;
    }

    return currNode.value;
  };

  /**
   * Find the index of the given value in the linked list
   * @param {*} pValue The value to get the index of
   * @returns {number} The index of the given value
   * @throws {Error} Throws an error if the linked list is empty
   */
  const findIndex = (pValue) => {
    if (size === 0) {
      throw new Error('The linked list is empty.');
    }

    let i = 0;
    let currNode = head;
    while (i < size && currNode.value !== pValue) {
      i += 1;
      currNode = currNode.nextNode;
    }

    if (currNode.value === pValue) {
      return i;
    }

    return null;
  };

  /**
   * Find if the linked list contains a given value
   * @param {*} pValue The value to look for in the linked list
   * @returns {boolean} True if the value is contained inside the linked list, otherwise false
   * @throws {Error} Throws an error if the linked list is empty
   */
  const contains = (pValue) => findIndex(pValue) !== null;

  /**
   * Change the linked list into a string of the form '(value) -> (value) -> ...'
   * @returns {string} A string representation of the linked list
   */
  const toString = () => {
    if (size === 0) {
      return '(empty)';
    }

    let str = '';
    let i = 0;
    let currNode = head;
    do {
      if (i === 0) {
        str += `(${currNode.value})`;
      } else {
        str += ` -> (${currNode.value})`;
      }
      currNode = currNode.nextNode;
      i += 1;
    } while (i < size);

    return str;
  };

  return {
    append,
    dequeue,
    prepend,
    pop,
    insertAt,
    removeAt,
    getSize,
    getHead,
    getTail,
    getValueAt,
    contains,
    findIndex,
    toString,
  };
}
