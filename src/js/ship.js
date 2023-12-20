/**
 * Create a ship with a given length and a position
 */
export default function createShip(pLength, pPosition) {
  const length = pLength;
  const position = pPosition;
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

  return { length, position, hit, isSunk };
}
