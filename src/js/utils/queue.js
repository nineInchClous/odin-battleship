import createLinkedList from './linkedList';

/**
 * Create a queue
 * @returns A queue
 */
export default function createQueue() {
  const queue = createLinkedList();

  return {
    enqueue: queue.append,
    dequeue: queue.dequeue,
    peek: queue.getHead,
    size: queue.getSize,
    toString: queue.toString,
  };
}
