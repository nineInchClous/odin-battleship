import { createGameBoard } from './gameBoard';

/**
 * Game object with player and ai board
 */
export const game = (() => {
  const player = (() => {
    const board = createGameBoard();

    return { board };
  })();
  const ai = (() => {
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

  /**
   * Returns true if all ships of one player are sunk
   * @returns {boolean} True if all ships of one player are sunk, otherwise false
   */
  const isGameOver = () =>
    player.board.isAllShipsSunk() || ai.board.isAllShipsSunk();

  /**
   * Returns the name of the winner ('player' or 'ai')
   * @returns {string} The name of the winner
   */
  const getWinner = () => {
    if (player.board.isAllShipsSunk()) {
      return 'ai';
    }

    return 'player';
  };

  /**
   * Attack as the player, then make the ai attack the player
   * @param {Array} pPosition The position to attack as the player (format: [x, y])
   */
  const playAttack = (pPosition) => {
    if (ai.board.receiveAttack(pPosition) && !isGameOver()) {
      ai.playRandomAttack(player.board);
    }
  };

  /**
   * Reset player's and ai's board
   */
  const resetGame = () => {
    player.board = createGameBoard();

    ai.board = createGameBoard();
    ai.board.placeShipsRandomly();
  };

  /**
   * Returns true if all ship from the player and the ai are placed
   * @returns {boolean} True if all ship from the player and the ai are placed, otherwise false
   */
  const isAllShipsPlaced = () =>
    player.board.isAllShipsPlaced() && ai.board.isAllShipsPlaced();

  return {
    player,
    ai,
    playAttack,
    resetGame,
    isGameOver,
    getWinner,
    isAllShipsPlaced,
  };
})();
