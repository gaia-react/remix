import ky from 'ky';
import type {Options} from 'ky';
import type {StringifyOptions} from 'query-string';
import {getBaseUrl, getHooks, getUri} from './utils';

type CreateOptions = {
  arrayFormat?: StringifyOptions['arrayFormat'];
  useSnakeCase?: boolean;
} & Options;

type RequestOptions = {
  pathParams?: Record<string, unknown>;
  searchParams?: Record<string, unknown>;
} & Options;

export const create = <ApiResponseType>({
  arrayFormat = 'comma',
  hooks,
  prefixUrl = getBaseUrl(),
  useSnakeCase = true,
  ...apiOptions
}: CreateOptions = {}) => {
  const kyInstance = ky.create({
    hooks: getHooks(useSnakeCase, hooks),
    prefixUrl,
    ...apiOptions,
  });

  const setAuthorization = (token: string) => {
    kyInstance.extend({
      hooks: {
        beforeRequest: [
          async (request) => {
            request.headers.set('Authorization', `Bearer ${token}`);
          },
        ],
      },
    });
  };

  const setAcceptLanguage = (language: string) => {
    kyInstance.extend({
      hooks: {
        beforeRequest: [
          async (request) => {
            request.headers.set('Accept-Language', language);
          },
        ],
      },
    });
  };

  const api = async (
    uri: string,
    {pathParams, searchParams, ...options}: RequestOptions = {}
  ) =>
    kyInstance<ApiResponseType>(
      getUri(uri, {arrayFormat, pathParams, searchParams, useSnakeCase}),
      options
    ).json();

  return {
    api,
    ky: kyInstance,
    setAcceptLanguage,
    setAuthorization,
  };
};
