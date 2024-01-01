import { createGameBoard } from './gameBoard';

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

  const isGameOver = () =>
    player.board.isAllShipsSunk() || ai.board.isAllShipsSunk();

  const playAttack = (pPosition) => {
    if (ai.board.receiveAttack(pPosition) && !isGameOver()) {
      ai.playRandomAttack(player.board);
    }
  };

  const getWinner = () => {
    if (player.board.isAllShipsSunk()) {
      return 'ai';
    }

    return 'player';
  };

  const resetGame = () => {
    player.board = createGameBoard();

    ai.board = createGameBoard();
    ai.board.placeShipsRandomly();
  };

  return { player, ai, playAttack, resetGame, isGameOver, getWinner };
})();
