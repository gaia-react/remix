import {describe, expect, test} from 'vitest';
import {sleep, tryCatch} from '../function';

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

  test('sleep', async () => {
    const start = Date.now();
    await sleep(100);
    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
  });
});
