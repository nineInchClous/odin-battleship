import createShip from '../ship';

test('Length is passed through constructor', () => {
  expect(createShip(2, [0, 0]).length).toBe(2);
});

test('Position is passed through constructor', () => {
  const ship = createShip(2, [1, 2]);
  expect(ship.position[0]).toBe(1);
  expect(ship.position[1]).toBe(2);
});

test('One hit does not sink a two-length ship', () => {
  const ship = createShip(2, [0, 0]);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('Two hits sink a two-length ship', () => {
  const ship = createShip(2, [0, 0]);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
