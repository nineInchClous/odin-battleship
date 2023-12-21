import createGameBoard from '../gameBoard';

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
  expect(() => board.placeShip(3, [3, 3], false)).toThrow(Error);
  expect(() => board.placeShip(3, [2, 4])).toThrow(Error);
});

test('Throws an error when placing a ship outside the board 1', () => {
  const board = createGameBoard();
  expect(() => board.placeShip(3, [11, 3])).toThrow(RangeError);
  expect(() => board.placeShip(3, [3, 11])).toThrow(RangeError);
});

test('Throws an error when placing a ship inside the board but with too big length horizontally', () => {
  const board = createGameBoard();
  expect(() => board.placeShip(3, [9, 9])).toThrow(RangeError);
});
test('Throws an error when placing a ship inside the board but with too big length vertically', () => {
  const board = createGameBoard();
  expect(() => board.placeShip(3, [9, 9], false)).toThrow(RangeError);
});

test('Correctly record a missed shot', () => {
  const board = createGameBoard();
  board.placeShip(3, [3, 3], false);
  expect(board.receiveAttack([0, 0])).toBe(false);
});

test('Cannot attack the same position twice', () => {
  const board = createGameBoard();
  board.placeShip(2, [3, 3], false);
  board.receiveAttack([3, 3]);
  expect(board.receiveAttack([3, 3])).toBe(false);
});

test('Throws an error when attacking a ship outside the board', () => {
  const board = createGameBoard();
  expect(() => board.receiveAttack([10, 9])).toThrow(RangeError);
  expect(() => board.receiveAttack([9, 10])).toThrow(RangeError);
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