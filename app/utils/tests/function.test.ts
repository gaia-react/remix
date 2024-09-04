import {describe, expect, test} from 'vitest';
import {tryCatch} from '../function';

describe('function utils', () => {
  test('tryCatch result', async () => {
    expect(await tryCatch((value: number) => 10 / value, 5)).toEqual([
      2,
      undefined,
    ]);
  });

  test('tryCatch error', async () => {
    expect(
      await tryCatch(() => {
        throw new Error('failed');
      })
    ).toEqual([undefined, new Error('failed')]);
  });
});
