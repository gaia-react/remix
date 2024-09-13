import {describe, expect, test} from 'vitest';
import {toHeadersObject} from '../http';

describe('http utils', () => {
  const obj = {fizz: 'buzz', foo: 'bar'};

  test('toHeadersObject should work with Headers', () => {
    expect(toHeadersObject(new Headers(obj))).toEqual(obj);
  });

  test('toHeadersObject should work with object', () => {
    expect(toHeadersObject(new Headers(obj))).toEqual(obj);
  });

  test('toHeadersObject should work with undefined', () => {
    expect(toHeadersObject()).toBeUndefined();
  });
});
