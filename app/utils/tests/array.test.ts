import {describe, expect, test} from 'vitest';
import {range} from '../array';

describe('array utils', () => {
  test('range should work', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(range(3, 5)).toEqual([3, 4, 5]);
    expect(range(-3, 5)).toEqual([-3, -2, -1, 0, 1, 2, 3, 4, 5]);
  });
});
