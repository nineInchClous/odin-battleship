import { game } from '../game';

test('Tell when the game is over', () => {
  game.player.board.placeShip(1, [0, 0]);
  expect(game.isGameOver()).toBe(false);
  game.player.board.receiveAttack([0, 0]);
  expect(game.isGameOver()).toBe(true);
});

test('Tell who won the game', () => {
  game.player.board.placeShip(1, [0, 0]);
  game.player.board.receiveAttack([0, 0]);
  expect(game.getWinner()).toBe('ai');
});
