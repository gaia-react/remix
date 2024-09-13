/* eslint-disable @typescript-eslint/no-explicit-any */
import {snakeCase} from 'lodash';
import queryString from 'query-string';
import type {StringifyOptions} from 'query-string';
import type {Language} from '~/languages';
import {getLanguageSession} from '~/sessions.server/language';
import type {Maybe} from '~/types';
import {compact, toSnakeCase} from '~/utils/object';

export const API_USES_SNAKE_CASE = true;

export const API_EXPECTS_TRAILING_SLASH = false;

export const getAcceptLanguage = async ({
  language,
  request,
}: {
  language?: Language;
  request?: Request;
}): Promise<string> => {
  if (request) {
    const languageSession = await getLanguageSession(request);

    return (
      languageSession.get() ||
      request.headers.get('Accept-Language') ||
      language ||
      'en'
    );
  }

  return language ?? 'en';
};

/* istanbul ignore next */
const getBaseUrl = () => {
  if (process.env.API_URL) {
    // server api call
    return process.env.API_URL;
  }

  if (typeof window !== 'undefined' && window.process.env.API_URL) {
    // client api call
    return window.process.env.API_URL;
  }

  // fallback
  return '';
};

export const BASE_URL = getBaseUrl();

//  Compact body with proper case for the request
export const getBody = (
  data?: FormData | Record<string, unknown>,
  useSnakeCase = API_USES_SNAKE_CASE
  // eslint-disable-next-line sonarjs/function-return-type
) => {
  if (!data) {
    return undefined;
  }

  if (data instanceof FormData) {
    if (!useSnakeCase) {
      return data;
    }
    const casedFormData = new FormData();

    [...data.keys()].forEach((key) => {
      casedFormData.set(snakeCase(key), data.get(key)!);
    });

    return casedFormData;
  }

  const compacted = compact(data, {keepFalsy: true});

  return JSON.stringify(useSnakeCase ? toSnakeCase(compacted) : compacted);
};

//  Compact params with proper case for the request
export const getParams = (
  params: Maybe<Record<string, unknown>>,
  options?: {
    arrayFormat?: StringifyOptions['arrayFormat'];
    useSnakeCase?: boolean;
  }
) => {
  if (!params) {
    return '';
  }

  const {arrayFormat, useSnakeCase} = options || {
    arrayFormat: 'comma',
    useSnakeCase: API_USES_SNAKE_CASE,
  };

  const compactedParams = compact(params, {keepFalsy: true});
  const casedParams = useSnakeCase ? toSnakeCase<any>(params) : compactedParams;

  return queryString.stringify(casedParams, {arrayFormat});
};

// Ensures leading and trailing slash as needed
export const getSafeUrl = (
  url: string,
  expectTrailingSlash = API_EXPECTS_TRAILING_SLASH
) => {
  const leadingSlash = url.startsWith('/') ? url : `/${url}`;

  if (url.includes('?')) {
    const [before, after] = leadingSlash.split('?');

    if (expectTrailingSlash) {
      const trailingSlash = before.endsWith('/') ? before : `${before}/`;

      return `${trailingSlash}?${after}`;
    }

    const noTrailingSlash = before.endsWith('/') ? before.slice(0, -1) : before;

    return `${noTrailingSlash}?${after}`;
  }

  if (expectTrailingSlash) {
    return url.endsWith('/') ? leadingSlash : `${leadingSlash}/`;
  }

  return url.endsWith('/') ? leadingSlash.slice(0, -1) : leadingSlash;
};
