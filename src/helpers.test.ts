import { expect, test } from 'vitest';
import { reduceSum, reduceSumRating } from './helpers';

test('Calculate rating count with reduceSum', () => {
  expect([150, 290, 5, 30, 30].reduce(reduceSum, 0)).toEqual(505);
});

test('Calculate weighted rating count with reduceSumRating', () => {
  expect([150, 290, 5, 30, 30].reduce(reduceSumRating, 0)).toEqual(1015);
});
