import ky from 'ky';
import type {StringifyOptions} from 'query-string';
import {compact} from '~/utils/object';
import {
  getBaseUrl,
  getUri,
  requestToSnakeCase,
  responseToCamelCase,
} from './utils';

type BodyJson =
  | {body?: FormData; json?: never}
  | {body?: never; json?: Record<string, unknown>};

type WithBodyJson = {
  method: 'POST' | 'PUT';
} & BodyJson;

type WithoutBodyJson = {
  body?: never;
  json?: never;
  method?: 'DELETE' | 'GET' | 'PATCH';
};

type RequestOptions = {
  headers?: Headers | Record<string, string>;
  pathParams?: Record<string, unknown>;
  searchParams?: Record<string, unknown>;
} & (WithBodyJson | WithoutBodyJson);

type ApiOptions = {
  arrayFormat?: StringifyOptions['arrayFormat'];
  prefixUrl: string;
  useSnakeCase?: boolean;
};

export const create = <R>(apiOptions?: ApiOptions) => {
  const {
    arrayFormat = 'comma',
    prefixUrl = getBaseUrl(),
    useSnakeCase = true,
  } = apiOptions ?? {};

  const beforeRequest = useSnakeCase ? [requestToSnakeCase] : [];
  const afterResponse = useSnakeCase ? [responseToCamelCase] : [];

  const kyInstance = ky.create({
    hooks: {afterResponse, beforeRequest},
    prefixUrl,
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

  const api = async (uri: string, options?: RequestOptions) => {
    const {
      body,
      headers,
      json,
      method = 'GET',
      pathParams,
      searchParams,
    } = options ?? {};

    return kyInstance<R>(
      getUri(uri, {
        arrayFormat,
        pathParams,
        searchParams,
      }),
      compact({body, headers, json, method})
    ).json();
  };

  return {
    api,
    setAcceptLanguage,
    setAuthorization,
  };
};
