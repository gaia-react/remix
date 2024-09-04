/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Language} from '~/languages';
import {toHeadersObject} from '~/utils/http';
import {compact, toCamelCase} from '~/utils/object';
import {
  API_USES_SNAKE_CASE,
  getAcceptLanguage,
  getBaseUrl,
  getBody,
  getParams,
  getSafeUrl,
} from './utils';

export const Accept = {
  JSON: 'application/json',
  TEXT_HTML:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
} as const;

export const ContentType = {
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  JSON: 'application/json',
  MULTIPART_FORM_DATA: 'multipart/form-data',
} as const;

type ApiOptions = {
  accept?: (typeof Accept)[keyof typeof Accept];
  contentType?: (typeof ContentType)[keyof typeof ContentType];
  data?: FormData | Record<string, unknown>;
  headers?: Headers | Record<string, string>;
  language?: Language;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  params?: Record<string, unknown>;
  preserveCase?: boolean;
  request?: Request;
};

export const api = async (url: string, options?: ApiOptions): Promise<any> => {
  const {
    accept = Accept.JSON,
    contentType = ContentType.JSON,
    data,
    headers,
    language,
    method,
    params,
    preserveCase,
    request,
  } = options || {};

  const body = getBody(data);
  const safeUrl =
    url.startsWith('http') ? url : `${getBaseUrl()}${getSafeUrl(url)}`;

  const safeParams = getParams(params);
  const q = url.includes('?') ? '&' : '?';
  const search = safeParams ? `${q}${safeParams}` : '';

  const cleanHeaders = compact({
    ...toHeadersObject(headers),
    Accept: accept,
    'Accept-Language': await getAcceptLanguage({language, request}),
    // Allow Content-Type to be automatically determined when body is FormData
    'Content-Type': body instanceof FormData ? undefined : contentType,
  });

  return fetch(
    `${safeUrl}${search}`,
    compact({
      body,
      headers: cleanHeaders,
      method,
    })
  )
    .then(async (response) => {
      if (
        response.status === 204 ||
        response.status === 205 ||
        response.status === 208
      ) {
        return null;
      }

      if (accept === Accept.JSON) {
        const originalCaseData = await response.json();

        if (preserveCase || !API_USES_SNAKE_CASE) {
          return originalCaseData.data;
        }

        return toCamelCase(originalCaseData.data);
      }

      return response;
    })
    .catch((error) => {
      if (process.env.NODE_ENV !== 'production') {
        // we output errors to the console in development/test environments
        // eslint-disable-next-line no-console
        console.error(error);
      }
      // It's better to handle errors in the caller than globally
      throw error;
    });
};
