import createShip from './ship';

/**
 * Create a game board of size 10x10
 */
export default function createGameBoard() {
  const size = 10;
  const boardShip = Array(size)
    .fill()
    .map(() => Array(size));
  const boardAttacks = Array(size)
    .fill()
    .map(() => Array(size));
  const ships = [];

  const placeShip = (pLength, pPosition, pHorizontal = true) => {
    if (
      pPosition[0] < 0 ||
      pPosition[0] >= size ||
      pPosition[1] < 0 ||
      pPosition[1] >= size
    ) {
      throw new RangeError(
        `The starting position of the ship is outside the board. It must be within 0 and ${size}.`
      );
    }

    if (pHorizontal) {
      if (pPosition[0] + pLength >= size) {
        throw new RangeError(
          `The end position of the ship is outside the board. It must be within 0 and ${size}. Change the starting position or the length of the ship`
        );
      } else {
        for (let i = 0; i < pLength; i += 1) {
          if (boardShip[pPosition[0] + i][pPosition[1]]) {
            throw new Error(
              `One ship is already at position [${pPosition[0] + i}, ${
                pPosition[1]
              }].`
            );
          }
        }
        const newShip = createShip(pLength);
        ships.push(newShip);
        for (let i = 0; i < pLength; i += 1) {
          boardShip[pPosition[0] + i][pPosition[1]] = newShip;
        }
      }
    } else if (pPosition[1] + pLength >= size) {
      throw new RangeError(
        `The end position of the ship is outside the board. It must be within 0 and ${size}. Change the starting position or the length of the ship`
      );
    } else {
      for (let i = 0; i < pLength; i += 1) {
        if (boardShip[pPosition[0]][pPosition[1] + i]) {
          throw new Error(
            `One ship is already at position [${pPosition[0]}, ${
              pPosition[1] + i
            }].`
          );
        }
      }
      const newShip = createShip(pLength);
      ships.push(newShip);
      for (let i = 0; i < pLength; i += 1) {
        boardShip[pPosition[0]][pPosition[1] + i] = newShip;
      }
    }
  };

  const receiveAttack = (pPosition) => {
    if (
      pPosition[0] < 0 ||
      pPosition[0] >= size ||
      pPosition[1] < 0 ||
      pPosition[1] >= size
    ) {
      throw new RangeError(
        `The starting position of the ship is outside the board. It must be within 0 and ${size}.`
      );
    }

    if (
      boardShip[pPosition[0]][pPosition[1]] &&
      !boardAttacks[pPosition[0]][pPosition[1]]
    ) {
      boardShip[pPosition[0]][pPosition[1]].hit();
      boardAttacks[pPosition[0]][pPosition[1]] = 'touched';
      return true;
    }

    boardAttacks[pPosition[0]][pPosition[1]] = 'missed';
    return false;
  };

  const isAllShipsSunk = () => {
    let allSunk = true;
    ships.forEach((ship) => {
      if (!ship.isSunk()) {
        allSunk = false;
      }
    });

    return allSunk;
  };

  return { placeShip, receiveAttack, isAllShipsSunk };
}
