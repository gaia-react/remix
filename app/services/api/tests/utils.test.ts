import {describe, expect, test} from 'vitest';
import {getAcceptLanguage, getBody, getParams, getSafeUrl} from '../utils';

describe('api utils', () => {
  test('getAcceptLanguage should return English when not defined', async () => {
    expect(await getAcceptLanguage({})).toBe('en');
  });

  test('getAcceptLanguage should return English from request headers', async () => {
    const request = new Request('https://example.com', {
      headers: new Headers({'Accept-Language': 'en'}),
    });
    expect(await getAcceptLanguage({request})).toBe('en');
  });

  test('getAcceptLanguage should return Japanese from request headers', async () => {
    const request = new Request('https://example.com', {
      headers: new Headers({'Accept-Language': 'ja'}),
    });
    expect(await getAcceptLanguage({request})).toBe('ja');
  });

  test('getAcceptLanguage should return headers by priority', async () => {
    const request = new Request('https://example.com', {
      headers: new Headers({'Accept-Language': 'en'}),
    });
    expect(await getAcceptLanguage({language: 'ja', request})).toBe('en');
  });

  test('getAcceptLanguage should return language when not defined', async () => {
    const request = new Request('https://example.com');
    expect(await getAcceptLanguage({language: 'ja', request})).toBe('ja');
  });

  test('getBody should snake_case FormData', () => {
    const formData = new FormData();
    formData.set('helloWorld', 'foobar');

    const snakeFormData = new FormData();
    snakeFormData.set('hello_world', 'foobar');
    expect(getBody(formData, true)).toEqual(snakeFormData);
  });

  test('getBody should keep camelCase FormData', () => {
    const formData = new FormData();
    formData.set('helloWorld', 'foobar');
    expect(getBody(formData, false)).toEqual(formData);
  });

  test('getBody should snake_case JSON', () => {
    const jsonData = {helloWorld: 'foobar', shouldBeMissing: []};
    expect(getBody(jsonData, true)).toEqual(
      JSON.stringify({hello_world: 'foobar'})
    );
  });

  test('getBody should keep camelCase JSON', () => {
    const jsonData = {helloWorld: 'foobar', shouldBeMissing: []};
    expect(getBody(jsonData, false)).toEqual(
      JSON.stringify({helloWorld: 'foobar'})
    );
  });

  test('getParams should return comma array snake_case params', () => {
    const params = {
      animal: ['dog', 'cat', 'fish'],
      helloWorld: 'foobar',
      numberIsZero: 0,
    };
    expect(getParams(params)).toEqual(
      'animal=dog,cat,fish&hello_world=foobar&number_is_zero=0'
    );
  });

  test('getParams should return bracket array and camelCase params', () => {
    const params = {
      animal: ['dog', 'cat', 'fish'],
      helloWorld: 'foobar',
      numberIsZero: 0,
    };
    expect(
      getParams(params, {arrayFormat: 'bracket', useSnakeCase: false})
    ).toEqual(
      'animal[]=dog&animal[]=cat&animal[]=fish&helloWorld=foobar&numberIsZero=0'
    );
  });

  test('getSafeUrl should ensure leading slash', () => {
    const url = 'test/leading/slash';
    expect(getSafeUrl(url, false)).toBe('/test/leading/slash');
  });

  test('getSafeUrl should remove trailing slash', () => {
    const url = '/test/trailing/slash/';
    expect(getSafeUrl(url, false)).toBe('/test/trailing/slash');
  });

  test('getSafeUrl should remove trailing slash with query params', () => {
    const url = '/test/trailing/slash/?foo=bar';
    expect(getSafeUrl(url, false)).toBe('/test/trailing/slash?foo=bar');
  });

  test('getSafeUrl should ensure trailing slash', () => {
    const url = '/test/trailing/slash';
    expect(getSafeUrl(url, true)).toBe('/test/trailing/slash/');
  });

  test('getSafeUrl should ensure trailing slash with query params', () => {
    const url = '/test/trailing/slash?foo=bar';
    expect(getSafeUrl(url, true)).toBe('/test/trailing/slash/?foo=bar');
  });
});
