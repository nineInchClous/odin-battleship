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
  let playerTurn = true;

  const playAttack = (pPosition) => {
    if (playerTurn && ai.board.receiveAttack(pPosition)) {
      playerTurn = false;
      document.setTimeout(() => {
        ai.playRandomAttack(player.board);
        playerTurn = true;
      }, 1000);
    }
  };

  const getWinner = () => {
    if (player.board.isAllShipsSunk()) {
      return 'ai';
    }

    return 'player';
  };

  const isGameOver = () =>
    player.board.isAllShipsSunk() || ai.board.isAllShipsSunk();

  const resetGame = () => {
    player.board = createGameBoard();

    ai.board = createGameBoard();
    ai.board.placeShipsRandomly();
  };

  return { player, ai, playAttack, resetGame, isGameOver, getWinner };
})();
