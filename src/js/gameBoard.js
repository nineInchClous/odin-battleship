import createShip from './ship';

/**
 * Create a cell for the game board with an alreadyAttacked and ship property
 * @returns A cell object for the game board
 */
export function createGameBoardCell() {
  const alreadyAttacked = false;
  const ship = null;

  return { alreadyAttacked, ship };
}

/**
 * Create a game board of size 10x10
 * @returns A game board object
 */
export function createGameBoard() {
  const size = 10;
  const board = [];
  for (let i = 0; i < size; i += 1) {
    const row = [];
    for (let j = 0; j < size; j += 1) {
      row.push(createGameBoardCell());
    }
    board.push(row);
  }
  const ships = [];

  /**
   * Returns true if the position is valid (inside the game board), otherwise false
   * @param {Array} pPosition The position to validate (format: [x, y])
   * @returns True if the position is valid, otherwise false
   */
  const isPositionValid = (pPosition) => {
    if (
      pPosition[0] < 0 ||
      pPosition[0] >= size ||
      pPosition[1] < 0 ||
      pPosition[1] >= size
    ) {
      return false;
    }

    return true;
  };

  /**
   * Returns true if the ship is placable (inside the game board), otherwise false
   * @param {number} pLength The length of the ship to place
   * @param {Array} pPosition The position to validate (format: [x, y])
   * @param {boolean} pHorizontal True if the ship is positioned horizontally, false if its positioned vertically
   * @returns True if the position of the ship is valid, otherwise false
   */
  const isShipPlacable = (pLength, pPosition, pHorizontal = true) => {
    if (!isPositionValid(pPosition)) return false;

    if (pHorizontal) {
      if (pPosition[0] + pLength - 1 >= size) return false;

      for (let i = 0; i < pLength; i += 1) {
        if (board[pPosition[0] + i][pPosition[1]].ship !== null) {
          return false;
        }
      }
    } else {
      if (pPosition[1] + pLength >= size) return false;

      for (let i = 0; i < pLength; i += 1) {
        if (board[pPosition[0]][pPosition[1] + i].ship !== null) {
          return false;
        }
      }
    }

    return true;
  };

  /**
   * Place a ship on the game board
   * @param {number} pLength The length of the ship to place
   * @param {Array} pPosition The position to validate (format: [x, y])
   * @param {boolean} pHorizontal True if the ship is positioned horizontally, false if its positioned vertically
   * @returns True if the ship has been placed, otherwise false
   */
  const placeShip = (pLength, pPosition, pHorizontal = true) => {
    if (!isShipPlacable(pLength, pPosition, pHorizontal)) return false;

    const newShip = createShip(pLength);
    ships.push(newShip);
    if (pHorizontal) {
      for (let i = 0; i < pLength; i += 1) {
        board[pPosition[0] + i][pPosition[1]].ship = newShip;
      }
    } else {
      for (let i = 0; i < pLength; i += 1) {
        board[pPosition[0]][pPosition[1] + i].ship = newShip;
      }
    }

    return true;
  };

  /**
   * Returns true if the attack is possible (inside the game board and that position has not already been attacked), otherwise false
   * @param {Array} pPosition The position to validate (format: [x, y])
   * @returns True if the attack is possible, otherwise false
   */
  const isAttackPossible = (pPosition) => {
    if (!isPositionValid(pPosition)) return false;

    if (board[pPosition[0]][pPosition[1]].alreadyAttacked) return false;

    return true;
  };

  /**
   * Attack a ship on the game board
   * @param {Array} pPosition The position to validate (format: [x, y])
   * @returns True if the attack position is valid, otherwise false
   */
  const receiveAttack = (pPosition) => {
    if (!isAttackPossible(pPosition)) return false;

    if (board[pPosition[0]][pPosition[1]].ship !== null) {
      board[pPosition[0]][pPosition[1]].ship.hit();
    }

    board[pPosition[0]][pPosition[1]].alreadyAttacked = true;

    return true;
  };

  /**
   * Returns true if all ship of the game board are sunk, otherwise false
   * @returns True if all ship of the game board are sunk, otherwise false
   */
  const isAllShipsSunk = () => {
    const notSunkShip = ships.find((ship) => !ship.isSunk());
    return typeof notSunkShip === 'undefined';
  };

  /**
   * Get all the possible attack positions
   * @returns An array of possible attack positions
   */
  const getAttackPositions = () => {
    const attackPositions = [];
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (!board[i][j].alreadyAttacked) {
          attackPositions.push([i, j]);
        }
      }
    }
    return attackPositions;
  };

  /**
   * Know if this position has already been attacked
   * @param {Array} pPosition The position to validate (format: [x, y])
   * @returns {object} A cell object
   * @throws {RangeError} Throws an error is the position is outside the game board
   */
  const getCellState = (pPosition) => {
    if (!isPositionValid(pPosition)) {
      throw new RangeError('This position is outside the game board');
    }
    return board[pPosition[0]][pPosition[1]];
  };

  const placeShipsRandomly = () => {
    const shipsLength = [5, 4, 3, 3, 2];
    let horizontal;
    let x;
    let y;

    shipsLength.forEach((shipLength) => {
      do {
        horizontal = Math.random() > 0.5;

        if (horizontal) {
          x = Math.floor(Math.random() * (size - shipLength + 1));
          y = Math.floor(Math.random() * size);
        } else {
          x = Math.floor(Math.random() * size);
          y = Math.floor(Math.random() * (size - shipLength + 1));
        }
      } while (!placeShip(shipLength, [x, y], horizontal));
    });
  };

  return {
    placeShip,
    receiveAttack,
    isAllShipsSunk,
    getAttackPositions,
    getCellState,
    placeShipsRandomly,
  };
}
