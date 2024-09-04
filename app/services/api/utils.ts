/* eslint-disable sonarjs/function-return-type,@typescript-eslint/no-explicit-any */
import type {Language} from '~/languages';
import {getLanguageSession} from '~/sessions.server/language';
import {compactFormData} from '~/utils/dom';
import {compact, toSnakeCase} from '~/utils/object';

export const API_USES_SNAKE_CASE = true;

export const API_EXPECTS_TRAILING_SLASH = false;

//  Compact body with proper case for the request
export const getBody = (data?: FormData | Record<string, unknown>) => {
  if (!data) {
    return undefined;
  }

  if (data instanceof FormData) {
    return compactFormData(data);
  }

  const compacted = compact(data, {keepFalsy: true});

  return JSON.stringify(
    API_USES_SNAKE_CASE ? toSnakeCase(compacted) : compacted
  );
};

//  Compact params with proper case for the request
export const getParams = (params?: Record<string, unknown>) => {
  if (!params) {
    return '';
  }

  const urlSearchParams = new URLSearchParams();
  const compactedParams = compact(params);
  const casedParams =
    API_USES_SNAKE_CASE ? toSnakeCase<any>(params) : compactedParams;

  Object.entries(casedParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const [head, ...tail] = value;

      if (urlSearchParams.has(key)) {
        tail.forEach((item) => {
          urlSearchParams.append(key, item);
        });
      } else {
        urlSearchParams.set(key, head);
      }
    } else {
      urlSearchParams.set(key, String(value));
    }
  });

  if (urlSearchParams.size === 0) {
    return '';
  }

  urlSearchParams.sort();

  return urlSearchParams.toString();
};

export const getBaseUrl = () => {
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

// Ensures leading and trailing slash as needed
export const getSafeUrl = (url: string) => {
  const leadingSlash = url.startsWith('/') ? url : `/${url}`;

  if (url.includes('?')) {
    const [before, after] = leadingSlash.split('?');

    if (API_EXPECTS_TRAILING_SLASH) {
      const trailingSlash = before.endsWith('/') ? before : `${before}/`;

      return `${trailingSlash}?${after}`;
    }

    const noTrailingSlash = before.endsWith('/') ? before.slice(0, -1) : before;

    return `${noTrailingSlash}?${after}`;
  }

  if (API_EXPECTS_TRAILING_SLASH) {
    return url.endsWith('/') ? leadingSlash : `${leadingSlash}/`;
  }

  return url.endsWith('/') ? leadingSlash.slice(0, -1) : leadingSlash;
};

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
