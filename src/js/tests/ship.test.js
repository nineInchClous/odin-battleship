import createShip from '../ship';

test('Length is passed through constructor', () => {
  expect(createShip(2).length).toBe(2);
});

test('One hit does not sink a two-length ship', () => {
  const ship = createShip(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('Two hits sink a two-length ship', () => {
  const ship = createShip(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
