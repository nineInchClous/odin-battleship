import { createGameBoard, createGameBoardCell } from '../gameBoard';

test('Correctly place a ship horizontally', () => {
  const board = createGameBoard();
  board.placeShip(2, [2, 0]);
  expect(board.receiveAttack([2, 0])).toBe(true);
});

test('Correctly place a ship vertically', () => {
  const board = createGameBoard();
  board.placeShip(3, [3, 3], false);
  expect(board.receiveAttack([3, 5])).toBe(true);
});

test('Two ships cannot overlap', () => {
  const board = createGameBoard();
  board.placeShip(3, [3, 3], false);
  expect(board.placeShip(3, [3, 3], false)).toBe(false);
  expect(board.placeShip(3, [2, 4])).toBe(false);
});

test('Returns false and do not place a ship when placing one outside the board', () => {
  const board = createGameBoard();
  expect(board.placeShip(3, [11, 3])).toBe(false);
  expect(board.placeShip(3, [3, 11])).toBe(false);
  expect(board.placeShip(1, [3, 9])).toBe(true);
});

test('Returns false and do not place a ship when placing one inside the board but with too big length horizontally', () => {
  const board = createGameBoard();
  expect(board.placeShip(3, [9, 9])).toBe(false);
  expect(board.placeShip(1, [9, 9])).toBe(true);
});
test('Returns false and do not place a ship when placing one inside the board but with too big length vertically', () => {
  const board = createGameBoard();
  expect(board.placeShip(3, [9, 9], false)).toBe(false);
  expect(board.placeShip(1, [9, 9])).toBe(true);
});

test('Correctly record a missed shot', () => {
  const board = createGameBoard();
  board.placeShip(3, [3, 3], false);
  expect(board.receiveAttack([0, 0])).toBe(true);
});

test('Returns false and do not attack when attacking the same position twice', () => {
  const board = createGameBoard();
  board.placeShip(2, [3, 3], false);
  board.receiveAttack([3, 3]);
  expect(board.receiveAttack([3, 3])).toBe(false);
});

test('Returns false and do not attack when attacking a ship outside the board', () => {
  const board = createGameBoard();
  expect(board.receiveAttack([10, 9])).toBe(false);
  expect(board.receiveAttack([9, 10])).toBe(false);
});

test('Correctly tell if all ship are sunk', () => {
  const board = createGameBoard();
  board.placeShip(1, [0, 0]);
  board.placeShip(2, [2, 2], false);
  expect(board.isAllShipsSunk()).toBe(false);
  board.receiveAttack([0, 0]);
  expect(board.isAllShipsSunk()).toBe(false);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 3]);
  expect(board.isAllShipsSunk()).toBe(true);
});

test('Give attackable positions', () => {
  const board = createGameBoard();
  board.receiveAttack([0, 0]);
  expect(board.getAttackPositions().length).toBe(99);
});

test('Give correct cell state', () => {
  const board = createGameBoard();
  expect(board.getCellState([0, 0]).alreadyAttacked).toBe(false);
  expect(board.getCellState([0, 0]).ship).toBe(null);
  board.receiveAttack([0, 0]);
  expect(board.getCellState([0, 0]).alreadyAttacked).toBe(true);
});
