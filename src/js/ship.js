/**
 * Create a ship with a given length
 */
export default function createShip(pLength) {
  const length = pLength;
  let hitCount = 0;

  /**
   * Add a hit to the ship
   */
  const hit = () => {
    hitCount += 1;
  };

  /**
   * Know if the ship is sunk or not
   * @returns True if the ship is sunk, otherwise false
   */
  const isSunk = () => hitCount >= length;

  return { length, hit, isSunk };
}
