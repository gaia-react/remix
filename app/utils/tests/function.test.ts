import {describe, expect, test} from 'vitest';
import {tryCatch} from '../function';

describe('function utils', () => {
  test('tryCatch result', async () => {
    expect(await tryCatch((value: number) => 10 / value, 5)).toEqual([
      undefined,
      2,
    ]);
  });

  test('tryCatch error', async () => {
    expect(
      await tryCatch(() => {
        throw new Error('failed');
      })
    ).toEqual([new Error('failed'), undefined]);
  });
});
