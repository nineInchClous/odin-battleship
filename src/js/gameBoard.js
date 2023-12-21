import createShip from './ship';

/**
 *
 * @returns
 */
function createGameBoardCell() {
  const alreadyAttacked = false;
  const ship = null;

  return { alreadyAttacked, ship };
}

/**
 * Create a game board of size 10x10
 */
export default function createGameBoard() {
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

  const isAttackPossible = (pPosition) => {
    if (!isPositionValid(pPosition)) return false;

    console.log(pPosition);
    console.log(board[pPosition[0]][pPosition[1]].alreadyAttacked);

    if (board[pPosition[0]][pPosition[1]].alreadyAttacked) return false;

    return true;
  };

  const receiveAttack = (pPosition) => {
    if (!isAttackPossible(pPosition)) return false;

    if (board[pPosition[0]][pPosition[1]].ship !== null) {
      board[pPosition[0]][pPosition[1]].ship.hit();
    }

    board[pPosition[0]][pPosition[1]].alreadyAttacked = true;

    return true;
  };

  const isAllShipsSunk = () => {
    const notSunkShip = ships.find((ship) => !ship.isSunk());
    return typeof notSunkShip === 'undefined';
  };

  /**
   * Get attackable positions
   * @returns Attackable positions
   */
  const getAttackablePositions = () => {
    const attackablePositions = [];
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (!board[i][j].alreadyAttacked) {
          attackablePositions.push([i, j]);
        }
      }
    }
    return attackablePositions;
  };

  const getCellState = (pPosition) => {
    if (!isPositionValid(pPosition)) return false;
    return board[pPosition[0]][pPosition[1]].alreadyAttacked;
  };

  return {
    placeShip,
    receiveAttack,
    isAllShipsSunk,
    getAttackablePositions,
    getCellState,
  };
}
