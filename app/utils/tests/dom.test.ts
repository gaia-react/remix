import {describe, expect, test} from 'vitest';
import {compactFormData} from '../dom';

describe('dom utils', () => {
  test('compactFormData', () => {
    const input = new FormData();
    input.set('foo', 'bar');
    input.set('fizz', '');

    const output = new FormData();
    output.set('foo', 'bar');

    expect(compactFormData(input)).toEqual(output);
  });
});
