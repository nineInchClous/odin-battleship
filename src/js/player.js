import createGameBoard from './gameBoard';

export const player = (() => {
  const board = createGameBoard();

  return { board };
})();

export const ai = (() => {
  const board = createGameBoard();
  board.placeShipsRandomly();

  /**
   * Attack another board with a random position
   * @param {*} pEnemyBoard The board to attack
   */
  const playRandomAttack = (pEnemyBoard) => {
    const possibleAttacks = board.getAttackPositions();
    const rndIndex = Math.floor(Math.random() * possibleAttacks.length);
    pEnemyBoard.receiveAttack(possibleAttacks[rndIndex]);
  };

  return { board, playRandomAttack };
})();
